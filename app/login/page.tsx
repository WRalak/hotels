'use client'

import React, { useState } from 'react';

const AuthForm = () => {
    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Form validation
    const validateForm = () => {
        setError("");
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            return false;
        }
        
        // Password validation - at least 8 characters
        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            return false;
        }
        
        // Confirm password check for registration
        if (state === "register" && password !== confirmPassword) {
            setError("Passwords do not match");
            return false;
        }
        
        // Name validation for registration
        if (state === "register" && name.trim().length < 2) {
            setError("Please enter your name (minimum 2 characters)");
            return false;
        }
        
        return true;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Clear previous messages
        setError("");
        setSuccess("");
        
        // Validate form
        if (!validateForm()) return;
        
        // Set loading state
        setLoading(true);
        
        try {
            // This is where you would connect to your authentication API
            if (state === "login") {
                // Example login call
                // const response = await loginUser({ email, password });
                
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                setSuccess("Login successful! Redirecting...");
                
                // Here you would typically:
                // 1. Store the authentication token
                // localStorage.setItem('authToken', response.token);
                // 2. Update your global auth state
                // 3. Redirect to a protected route
                
                // For demo, we'll just clear the form
                setTimeout(() => {
                    // window.location.href = '/dashboard';
                    console.log("Login successful", { email, password });
                }, 1500);
                
            } else {
                // Example registration call
                // const response = await registerUser({ name, email, password });
                
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                setSuccess("Account created successfully! You can now login.");
                
                // Reset form and switch to login mode
                setTimeout(() => {
                    setName("");
                    setPassword("");
                    setConfirmPassword("");
                    setState("login");
                    console.log("Registration successful", { name, email, password });
                }, 1500);
            }
        } catch (err) {
            // Handle specific error codes from your API
            setError(err.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
            <p className="text-2xl font-medium m-auto">
                <span className="text-indigo-500">User</span> {state === "login" ? "Login" : "Sign Up"}
            </p>
            
            {/* Error message */}
            {error && (
                <div className="w-full p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                    {error}
                </div>
            )}
            
            {/* Success message */}
            {success && (
                <div className="w-full p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm">
                    {success}
                </div>
            )}
            
            {state === "register" && (
                <div className="w-full">
                    <p>Name</p>
                    <input 
                        onChange={(e) => setName(e.target.value)} 
                        value={name} 
                        placeholder="Enter your name" 
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" 
                        type="text" 
                        required 
                    />
                </div>
            )}
            
            <div className="w-full">
                <p>Email</p>
                <input 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} 
                    placeholder="your@email.com" 
                    className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" 
                    type="email" 
                    required 
                />
            </div>
            
            <div className="w-full">
                <p>Password</p>
                <input 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} 
                    placeholder="Min. 8 characters" 
                    className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" 
                    type="password" 
                    required 
                />
            </div>
            
            {state === "register" && (
                <div className="w-full">
                    <p>Confirm Password</p>
                    <input 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        value={confirmPassword} 
                        placeholder="Re-enter your password" 
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" 
                        type="password" 
                        required 
                    />
                </div>
            )}
            
            {state === "login" && (
                <div className="w-full text-right">
                    <a href="#" className="text-sm text-indigo-500 hover:underline">
                        Forgot password?
                    </a>
                </div>
            )}
            
            {state === "register" ? (
                <p className="text-sm text-gray-600">
                    Already have an account? <span onClick={() => setState("login")} className="text-indigo-500 cursor-pointer hover:underline">Log in</span>
                </p>
            ) : (
                <p className="text-sm text-gray-600">
                    Don't have an account? <span onClick={() => setState("register")} className="text-indigo-500 cursor-pointer hover:underline">Sign up</span>
                </p>
            )}
            
            <button 
                type="submit"
                disabled={loading}
                className={`bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer ${loading ? 'opacity-75' : ''}`}
            >
                {loading ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {state === "register" ? "Creating Account..." : "Logging in..."}
                    </span>
                ) : (
                    state === "register" ? "Create Account" : "Login"
                )}
            </button>
            
            {/* Social login options */}
            <div className="w-full mt-4">
                <div className="relative flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-sm">or continue with</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <button 
                        type="button"
                        className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        <svg className="h-5 w-5 mr-2" fill="#4285F4" viewBox="0 0 24 24">
                            <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
                        </svg>
                        Google
                    </button>
                    <button 
                        type="button"
                        className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        <svg className="h-5 w-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Facebook
                    </button>
                </div>
            </div>
            
            <p className="text-xs text-gray-500 text-center w-full mt-4">
                By continuing, you agree to our <a href="#" className="text-indigo-500 hover:underline">Terms of Service</a> and <a href="#" className="text-indigo-500 hover:underline">Privacy Policy</a>.
            </p>
        </form>
    );
};

export default AuthForm;