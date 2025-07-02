import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
} from "class-validator";

export class NonMemberLoginValidator {
  @IsEmail({}, { message: "이메일 형식이 올바르지 않습니다." })
  email!: string;

  @MinLength(5)
  order_number!: string;
}

export class LoginValidator {
  @IsEmail({}, { message: "이메일 형식이 올바르지 않습니다." })
  email!: string;

  @MinLength(6)
  password!: string;
}

export class ForgotPasswordValidator {
  @IsEmail({}, { message: "이메일 형식이 올바르지 않습니다." })
  email!: string;
}

export class RegisterValidator {
  @MinLength(3)
  @IsString()
  firstname!: string;

  @MinLength(3)
  @IsString()
  lastname!: string;

  @IsEmail({}, { message: "이메일 형식이 올바르지 않습니다." })
  email!: string;

  @IsEmail({}, { message: "이메일 형식이 올바르지 않습니다." })
  email_confirmation!: string;

  @MinLength(6)
  password!: string;

  @MinLength(6)
  password_confirmation!: string;

  // @IsString()
  // phone!: string;
}

export class CreatePasswordValidator {
  @MinLength(6)
  password!: string;

  @MinLength(6)
  password_confirmation!: string;
}

export class EditAccountValidator {
  @IsOptional()
  @ValidateIf((o) => o.password.length)
  @MinLength(6)
  password!: string;

  @IsOptional()
  @ValidateIf((o) => o.password.length)
  @MinLength(6)
  password_confirmation!: string;

  // @IsString()
  // phone!: string;
}
