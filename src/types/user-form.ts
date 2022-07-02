import { CreateUserDto, SignInDto, UpdateUserDto } from "types";

export type UserFormSignup = CreateUserDto & {repeatPassword: string};

export type UserFormUpdate = UpdateUserDto & {repeatNewPassword: string};

export type UserFormSignIn = SignInDto;

