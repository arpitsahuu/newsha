Here’s a well-structured and reusable implementation of the **Forgot Password** feature in Nest.js using OTP.

---

## **📌 Steps to Implement**
1️⃣ Create DTOs for request validation.  
2️⃣ Implement a reusable **OTP Service**.  
3️⃣ Add logic in **Auth Service** for password reset.  
4️⃣ Create **Auth Controller** to handle requests.  
5️⃣ Implement the **User Service** method to update passwords.  
6️⃣ Use **environment variables** for email credentials.  

---

## **📂 Project Structure**
```
src/
│── auth/
│   ├── dto/
│   │   ├── forgot-password.dto.ts
│   │   ├── verify-otp.dto.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│── otp/
│   ├── otp.service.ts
│── users/
│   ├── users.service.ts
│── config/
│   ├── email.config.ts
│── main.ts
│── .env
```

---

## **1️⃣ Create DTOs**
### **📌 `src/auth/dto/forgot-password.dto.ts`**
```ts
import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail()
  email: string;
}
```

### **📌 `src/auth/dto/verify-otp.dto.ts`**
```ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class VerifyOtpDto {
  @IsEmail()
  email: string;

  @IsString()
  otp: string;

  @IsString()
  @MinLength(6)
  newPassword: string;
}
```

---

## **2️⃣ Create OTP Service**
✅ Generates OTP and stores it in memory (Use **Redis** in production).  
✅ Sends OTP via email.  

### **📌 `src/otp/otp.service.ts`**
```ts
import { Injectable, BadRequestException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class OtpService {
  private otpStore = new Map<string, string>(); // Use Redis in production

  async generateOtp(email: string): Promise<string> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    this.otpStore.set(email, otp);

    // Send OTP to Email
    await this.sendEmail(email, otp);
    
    return otp;
  }

  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const storedOtp = this.otpStore.get(email);
    if (storedOtp === otp) {
      this.otpStore.delete(email);
      return true;
    }
    throw new BadRequestException('Invalid or expired OTP');
  }

  private async sendEmail(email: string, otp: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Reset Password OTP',
      text: `Your OTP is: ${otp}`,
    });
  }
}
```

---

## **3️⃣ Implement Auth Service**
✅ Calls **OTP Service** for sending and verifying OTP.  
✅ Updates the password after OTP verification.  

### **📌 `src/auth/auth.service.ts`**
```ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { OtpService } from '../otp/otp.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private otpService: OtpService,
  ) {}

  async sendOtp(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException('User not found');

    await this.otpService.generateOtp(email);
    return { message: 'OTP sent to email' };
  }

  async verifyOtp(email: string, otp: string, newPassword: string) {
    const isValid = await this.otpService.verifyOtp(email, otp);
    if (!isValid) throw new BadRequestException('Invalid OTP');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.usersService.updatePassword(email, hashedPassword);

    return { message: 'Password reset successfully' };
  }
}
```

---

## **4️⃣ Implement Auth Controller**
✅ Handles requests for forgot password and OTP verification.  

### **📌 `src/auth/auth.controller.ts`**
```ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.sendOtp(body.email);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: VerifyOtpDto) {
    return this.authService.verifyOtp(body.email, body.otp, body.newPassword);
  }
}
```

---

## **5️⃣ Update User Service**
✅ Updates the user's password in the database.  

### **📌 `src/users/users.service.ts`**
```ts
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = []; // Replace with actual database calls

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async updatePassword(email: string, newPassword: string) {
    const user = await this.findByEmail(email);
    if (user) {
      user.password = newPassword;
    }
  }
}
```

---

## **6️⃣ Configure Email Credentials**
### **📌 `src/config/email.config.ts`**
```ts
export default () => ({
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
});
```

---

## **7️⃣ Add Environment Variables**
### **📌 `.env`**
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
```

---

## **✅ How to Test?**
1️⃣ **Request OTP** → `POST /auth/forgot-password`  
```json
{ "email": "user@example.com" }
```
2️⃣ **Verify OTP & Reset Password** → `POST /auth/verify-otp`  
```json
{ "email": "user@example.com", "otp": "123456", "newPassword": "newpass123" }
```

---

## **🎯 Summary**
✔️ **Modular & Reusable** – OTP logic is separated in **OtpService**.  
✔️ **Secure** – Uses bcrypt for password hashing.  
✔️ **Environment Config** – Stores email credentials in `.env`.  
✔️ **Extensible** – Can replace in-memory OTP storage with **Redis**.  

---

### **🚀 Next Steps**
🔹 Use Redis for OTP storage (instead of `Map<string, string>`).  
🔹 Add expiration time for OTPs (e.g., **5 minutes**).  
🔹 Improve error handling and logging.  

Would you like me to help with Redis integration? 🚀
