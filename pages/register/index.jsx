import React from "react";
import Head from "next/head";
import Link from "next/link";
import { FaDochub } from "react-icons/fa";
import { Checkbox, useToast, Tooltip, Spinner } from "@chakra-ui/react";
import Axios from "axios";
import { useRouter } from "next/router";

export default function Register() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [checkRepeat, setCheckRepeat] = React.useState("");
  const [passwordStrength, setPasswordStrength] = React.useState();
  const [usernameUsed, setUsernameUsed] = React.useState(false);
  const [usernameMsg, setUsernameMsg] = React.useState("");
  const [usedEmail, setUsedEmail] = React.useState(false);
  const [emailMsg, setEmailMsg] = React.useState("");
  const [button, setButton] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [throttle, setThrottle] = React.useState(false);
  const toast = useToast();
  const router = useRouter();

  const btnRegister = () => {
    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var PasswordFormat =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    //Syarat One Upper Case, One Lower Case, One Number Digit, One Special Character, Minimum Eight Character

    if (
      email.match(mailFormat) &&
      password.match(PasswordFormat) &&
      password == repeatPassword &&
      !usernameUsed &&
      !usedEmail
    ) {
      setThrottle(true);
      setTimeout(() => {
        Axios.post("http://localhost:3105" + "/auth/register", {
          username,
          email,
          password,
        }).then((res) => {
          if (res.data.success) {
            toast({
              title: "Account Created",
              description: "Please check your email to verify your account.",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            localStorage.setItem('verification', res.data.token);
            setUsername("");
            setEmail("");
            setPassword("");
            setRepeatPassword("");
            setThrottle(false);
          }
        });
      }, 3000);
    } else {
      toast({
        title: "",
        description: "Please enter the correct username, email or password",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  React.useEffect(() => {
    if (repeatPassword) {
      if (repeatPassword != password) {
        setCheckRepeat("Password must match");
      } else {
        setCheckRepeat("");
      }
    } else if (!password) {
      setCheckRepeat("");
    }
  }, [repeatPassword, password]);

  React.useEffect(() => {
    var PasswordFormat =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (password.match(PasswordFormat)) {
      setPasswordStrength("Medium");
      if (password.length >= 12) {
        //strong
        setPasswordStrength("Strong");
      }
    } else {
      //weak
      if (!password) {
        setPasswordStrength("");
      } else {
        setPasswordStrength("Weak");
      }
    }
  }, [password]);

  React.useEffect(() => {
    if (username) {
      Axios.post("http://localhost:3105" + "/auth/username", {
        username,
      }).then((res) => {
        if (res.data.length > 0) {
          let check = [];
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].username.toLowerCase() === username.toLowerCase()) {
              check.push(true);
            }
          }
          if (check.length > 0) {
            setUsernameUsed(true);
          } else {
            setUsernameUsed(false);
          }
        } else {
          setUsernameUsed(false);
        }
      });
    }
    //username unique
  }, [username]);

  React.useEffect(() => {
    if (email) {
      Axios.post("http://localhost:3105" + "/auth/email", {
        email,
      }).then((res) => {
        if (res.data.length > 0) {
          let check = [];
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].email.toLowerCase() === email.toLowerCase()) {
              check.push(true);
            }
          }
          if (check.length > 0) {
            setUsedEmail(true);
          } else {
            setUsedEmail(false);
          }
        } else {
          setUsedEmail(false);
        }
      });
    }
  }, [email]);

  React.useEffect(() => {
    let text = username.replace(/^\s+|\s+$/gm, "");
    let text1 = email.replace(/^\s+|\s+$/gm, "");
    let text2 = password.replace(/^\s+|\s+$/gm, "");
    let text3 = repeatPassword.replace(/^\s+|\s+$/gm, "");

    if (text && text1 && text2 && text3) {
      setButton(false);
    } else {
      setButton(true);
    }
  }, [username, email, password, repeatPassword]);

  React.useEffect(() => {
    let token = localStorage.getItem("diskchord");
    if (token) {
      Axios.get("http://localhost:3105/auth/keep", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.data.idusers) {
          setData(res.data);
        }
      });
    }
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      if (loading) {
        setLoading(false);
      }
    }, 2000);
  }, [loading])

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="title" content="DiskChord" />
        <meta name="description" content="Social Media Next JS" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://diskchord.com/" />
        <meta
          property="og:title"
          content="DiskChord — Share your life music experience"
        />
        <meta property="og:description" content="Social Media Next JS" />
        <meta
          property="og:image"
          content="https://i.ibb.co/MMnYxyj/dochub-brands.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://diskchord.com/" />
        <meta
          property="twitter:title"
          content="DiskChord — Share your life music experience"
        />
        <meta property="twitter:description" content="Social Media Next JS" />
        <meta
          property="twitter:image"
          content="https://i.ibb.co/MMnYxyj/dochub-brands.png"
        />

        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <title>DiskChord</title>
      </Head>
      <div>
      {loading ? (
        <div className="flex items-center justify-center h-screen w-full">
          <Spinner 
            size='xl' 
            thickness="4px" 
            speed="0.7s" 
            emptyColor="gray.200" 
            color="blue.400"
            className=""
          />
        </div>
      )
        : 
        data.idusers ? (
        <div className="flex items-center justify-center min-h-screen">
          <h1 className="text-6xl">404 Error Page Not Found</h1>
        </div>
      ) : (
        <div
          style={{
            backgroundImage: `url(/bg1-mirror.png)`,
            backgroundSize: "cover",
            overflow: "hidden",
            maxWidth: "100%",
          }}
          className="h-screen flex items-center"
        >
          <div className="container mx-auto h-[75vh] lg:max-w-[1320px] lg:min-w-[1320px]">
            <div className="h-full lg:grid grid-cols-3 flex flex-col-reverse">
              <div className="bg-white col-span-1">
                <div className="absolute hidden lg:block cursor-pointer">
                  <div className="flex items-center m-3">
                    <FaDochub size={30} color="#3182CE" />
                    <h3 className="text-xl text-third font-semibold">
                      DiskChord
                    </h3>
                  </div>
                </div>
                <div className="flex items-center h-full justify-center mt-10 xl:mt-0">
                  <div className="mx-auto text-center w-full space-y-5">
                    <h1 className="text-4xl font-bold text-center text-primary">
                      Already a member?
                    </h1>
                    <h4 className="text-lg px-16 mx-auto text-center text-primary">
                      Sign in and continue our journey!
                    </h4>
                    <Link href="/">
                      <button className="bg-telegram rounded-full w-40 h-12 text-white hover:brightness-90 font-bold">
                        Sign In
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="bg-bglight bg-opacity-75 lg:col-span-2 col-span-3">
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <h1 className="text-4xl font-bold text-center text-primary">
                    New Here?
                  </h1>
                  <h4 className="text-base px-16 mx-10 text-center text-primary">
                    Sign up and discover a great amount of new opportunities!
                  </h4>
                  <div className="flex flex-col items-center justify-center w-full">
                    <Tooltip
                      hasArrow
                      label="Username must be unique"
                      bg="gray.300"
                      color="black"
                    >
                      <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        className="rounded-full bg-bgInput w-full md:w-[50%] border-gray-400"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Tooltip>
                    {username ? (
                      usernameUsed ? (
                        <small className="h-4 text-left w-full md:w-[50%] px-4 text-red-500 font-bold">
                          Username already used, try another username
                        </small>
                      ) : (
                        <small className="h-4 text-left w-full md:w-[50%] px-4 text-green-400 font-bold">
                          Username available
                        </small>
                      )
                    ) : (
                      <small className="h-4 text-left w-full md:w-[50%] px-4 text-green-400 font-bold">
                        {usernameMsg}
                      </small>
                    )}
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    className="rounded-full bg-bgInput w-full md:w-[50%] border-gray-400"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {email ? (
                    usedEmail ? (
                      <small className="my-1 text-left w-full md:w-[50%] px-4 text-red-500 font-bold">
                        Email already used, try another email
                      </small>
                    ) : (
                      <small className="my-1 text-left w-full md:w-[50%] px-4 text-green-400 font-bold">
                        Email available
                      </small>
                    )
                  ) : (
                    <small className="my-1 text-left w-full md:w-[50%] px-4 text-green-400 font-bold">
                      {emailMsg}
                    </small>
                  )}
                  <div className="flex flex-col w-full items-center justify-center">
                    <Tooltip
                      hasArrow
                      label="Password must contain minimum 8 characters, 1 uppercase letter, a number, and a symbol (#?!@$%^&*-)"
                      bg="gray.300"
                      color="black"
                    >
                      <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        className="rounded-full bg-bgInput w-full md:w-[50%] border-gray-400 mb-0"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Tooltip>
                    {passwordStrength === "Weak" ? (
                      <small className="mb-4 text-left w-full md:w-[50%] px-4 text-black">
                        Password strength :{" "}
                        <p className="text-red-500 font-bold inline">
                          {passwordStrength}
                        </p>
                      </small>
                    ) : passwordStrength === "Medium" ? (
                      <small className="mb-4 text-left w-full md:w-[50%] px-4 text-black">
                        Password strength :{" "}
                        <p className="text-yellow-400 font-bold inline">
                          {passwordStrength}
                        </p>
                      </small>
                    ) : (
                      <small className="mb-4 text-left w-full md:w-[50%] px-4 text-black">
                        Password strength :{" "}
                        <p className="text-green-400 font-bold inline">
                          {passwordStrength}
                        </p>
                      </small>
                    )}
                    <Tooltip
                      hasArrow
                      label="Password must match"
                      bg="gray.300"
                      color="black"
                    >
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        value={repeatPassword}
                        className="rounded-full bg-bgInput w-full md:w-[50%] border-gray-400"
                        required
                        onChange={(e) => setRepeatPassword(e.target.value)}
                      />
                    </Tooltip>
                    <small className="my-1 text-left w-full md:w-[50%] px-4 text-red-500 font-bold">
                      {checkRepeat}
                    </small>
                  </div>
                  <Checkbox className="text-start px-2.5 w-full md:w-[50%] text-xs">
                    I agree to Platfrom&apos;s{" "}
                    <p className="hover:underline cursor-pointer inline">
                      Terms of Service
                    </p>{" "}
                    and{" "}
                    <p className="hover:underline cursor-pointer inline">
                      Privacy Policy
                    </p>{" "}
                  </Checkbox>
                  {throttle ? <><Spinner size='md' thickness='4px' speed='0.7s' emptyColor="gray.200" color="blue.400"/></> : 
                  <button
                    className="bg-facebook rounded-full w-40 h-12 text-white hover:brightness-90 font-bold disabled:opacity-50 disabled:hover:brightness-100"
                    onClick={btnRegister}
                    disabled={button}
                  >
                    Sign Up
                  </button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
