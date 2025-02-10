"use client";

import CustomIconTheme from "@/components/secondary/custom-icon-theme";
import Image from "@/components/secondary/image";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import Link from "next/link";

export default function SignInPage() {
	return (
		<div className="w-full h-screen flex">
			{/* Left */}
			<div className="flex-1 lg:flex items-center justify-center flex-col gap-10 hidden">
				<CustomIconTheme
					lightMode={
						<Image
							path="/assets/full-logo-light.svg"
							alt="logo"
							w={300}
							h={150}
							className="hidden 2xl:block"
						/>
					}
					darkMode={
						<Image
							path="/assets/full-logo-dark.svg"
							alt="logo"
							w={300}
							h={150}
							className="hidden 2xl:block"
						/>
					}
				/>
				<h1 className="text-2xl font-bold italic">
					Stay Connected, Stay Updated
				</h1>
			</div>
			{/* Right */}
			<div className="flex-1 flex items-center justify-start">
				<Card className="border-none w-[45%]">
					<CardHeader className="flex flex-col items-start gap-5">
						<CardTitle className="text-4xl font-extrabold">
							Happening now
						</CardTitle>
						<CardDescription className="text-3xl font-semibold text-foreground">
							Join Today
						</CardDescription>
						<CardDescription></CardDescription>
					</CardHeader>
					<CardContent>
						<SignIn.Root>
							<Clerk.GlobalError className="block text-sm text-red-600" />

							{/* Google and Apple Login */}
							<div className="flex flex-col gap-4">
								<Clerk.Connection name="google" asChild>
									<Button className="w-full rounded-full py-6 text-lg font-medium [&_svg]:size-6 px-10">
										<svg
											viewBox="0 0 24 24"
											width={24}
											height={24}
										>
											<path
												d="M18.977 4.322L16 7.3c-1.023-.838-2.326-1.35-3.768-1.35-2.69 0-4.95 1.73-5.74 4.152l-3.44-2.635c1.656-3.387 5.134-5.705 9.18-5.705 2.605 0 4.93.977 6.745 2.56z"
												fill="#EA4335"
											></path>
											<path
												d="M6.186 12c0 .66.102 1.293.307 1.89L3.05 16.533C2.38 15.17 2 13.63 2 12s.38-3.173 1.05-4.533l3.443 2.635c-.204.595-.307 1.238-.307 1.898z"
												fill="#FBBC05"
											></path>
											<path
												d="M18.893 19.688c-1.786 1.667-4.168 2.55-6.66 2.55-4.048 0-7.526-2.317-9.18-5.705l3.44-2.635c.79 2.42 3.05 4.152 5.74 4.152 1.32 0 2.474-.308 3.395-.895l3.265 2.533z"
												fill="#34A853"
											></path>
											<path
												d="M22 12c0 3.34-1.22 5.948-3.107 7.688l-3.265-2.53c1.07-.67 1.814-1.713 2.093-3.063h-5.488V10.14h9.535c.14.603.233 1.255.233 1.86z"
												fill="#4285F4"
											></path>
										</svg>
										Sign in with Google
									</Button>
								</Clerk.Connection>
								<Clerk.Connection name="apple" asChild>
									<Button className="w-full rounded-full py-6 text-lg font-medium [&_svg]:size-6">
										<svg
											viewBox="0 0 24 24"
											width={24}
											height={24}
										>
											<path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"></path>
										</svg>
										Sign in with Apple
									</Button>
								</Clerk.Connection>
							</div>

							{/* Or seperator */}
							<div className="flex items-center gap-4 my-4">
								<Separator
									orientation="vertical"
									className="flex-grow h-px"
								/>
								<span className="text-muted-foreground">
									or continue with
								</span>
								<Separator
									orientation="vertical"
									className="flex-grow h-px"
								/>
							</div>

							{/* Email */}
							<SignIn.Step
								name="start"
								className="flex flex-col gap-4"
							>
								<Clerk.Field name="identifier">
									<Clerk.Input asChild>
										<Input
											type="email"
											placeholder="Enter your email"
											className="bg-secondary border-foreground/50"
										/>
									</Clerk.Input>
									<Clerk.FieldError className="text-red-500 text-sm" />
								</Clerk.Field>
								<SignIn.Action submit asChild>
									<Button className="rounded-full font-medium text-lg">
										Continue
									</Button>
								</SignIn.Action>
							</SignIn.Step>

							{/* Password */}
							<SignIn.Step
								name="verifications"
								className="flex flex-col gap-4"
							>
								<SignIn.Strategy name="password">
									<Clerk.Field name="password">
										<Clerk.Input asChild>
											<Input
												type="password"
												placeholder="Enter your password"
												className="bg-secondary border-foreground/50"
											/>
										</Clerk.Input>
										<Clerk.FieldError className="text-red-500 text-sm" />
									</Clerk.Field>
									<SignIn.Action
										navigate="forgot-password"
										className="text-start hover:underline hover:text-foreground text-muted-foreground"
									>
										Forgot password?
									</SignIn.Action>
									<SignIn.Action submit asChild>
										<Button className="rounded-full font-medium text-lg">
											Continue
										</Button>
									</SignIn.Action>
								</SignIn.Strategy>

								{/* Password Reset Verification Code */}
								<SignIn.Strategy name="reset_password_email_code">
									<p className="text-sm mb-2">
										We sent a code to{" "}
										<span className="font-semibold">
											<SignIn.SafeIdentifier />.
										</span>
									</p>

									<Clerk.Field
										name="code"
										className="flex flex-col gap-2"
									>
										<Clerk.Input asChild>
											<Input
												type="text"
												placeholder="Enter code"
												className="bg-secondary border-foreground/50"
											/>
										</Clerk.Input>
										<Clerk.FieldError className="text-red-500 text-sm" />
									</Clerk.Field>

									<SignIn.Action submit asChild>
										<Button className="rounded-full font-medium text-lg">
											Continue
										</Button>
									</SignIn.Action>
								</SignIn.Strategy>
							</SignIn.Step>

							{/* Password Reset Confirmation */}
							<SignIn.Step name="forgot-password">
								<h1 className="font-semibold text-center">
									Do you want to proceed with password reset?
								</h1>

								<div className="flex items-center gap-5 justify-between  my-4">
									<SignIn.Action navigate="previous" asChild>
										<Button
											className="rounded-full font-semibold"
											variant="secondary"
										>
											Go back
										</Button>
									</SignIn.Action>

									<SignIn.SupportedStrategy
										name="reset_password_email_code"
										asChild
									>
										<Button className="rounded-full font-semibold">
											Reset password
										</Button>
									</SignIn.SupportedStrategy>
								</div>
							</SignIn.Step>

							{/* Reset Password */}
							<SignIn.Step name="reset-password">
								<h1>Reset your password</h1>

								<Clerk.Field name="password">
									<Clerk.Label>New password</Clerk.Label>
									<Clerk.Input />
									<Clerk.FieldError />
								</Clerk.Field>

								<Clerk.Field name="confirmPassword">
									<Clerk.Label>Confirm password</Clerk.Label>
									<Clerk.Input />
									<Clerk.FieldError />
								</Clerk.Field>

								<SignIn.Action submit>
									Reset password
								</SignIn.Action>
							</SignIn.Step>

							{/* Or seperator */}
							<div className="flex items-center gap-4 my-4">
								<Separator
									orientation="vertical"
									className="flex-grow h-px"
								/>
								<span className="text-muted-foreground">
									Don&apos;t have an account?
								</span>
								<Separator
									orientation="vertical"
									className="flex-grow h-px"
								/>
							</div>

							{/* Create Account */}
							<Link href="/sign-up">
								<Button className="w-full bg-sky-500 hover:bg-sky-600 font-semibold text-foreground rounded-full py-6 text-lg">
									Create an account
								</Button>
							</Link>

							{/* Terms */}
							<p className="text-sm text-muted-foreground my-3">
								By signing up, you agree to the{" "}
								<span className="text-blue-500">
									Terms of Service
								</span>{" "}
								and{" "}
								<span className="text-blue-500">
									Privacy Policy
								</span>
								, including{" "}
								<span className="text-blue-500">
									Cookie Use
								</span>
								.
							</p>
						</SignIn.Root>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
