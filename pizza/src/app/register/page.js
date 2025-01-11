"use client";
// In Next.js 13 and later, the "use client" directive is a special syntax used to explicitly mark a file or component as a client component. This directive is necessary when working with the new App Router and its Server-Client Component architecture.
// read notebook
// In the provided code, you’re using useState, which is a client-side feature, so the "use client" directive is necessary to tell Next.js that this component should be executed on the client.




import Image from "next/image";
import { useState } from "react";
export default function Registerpage() {
    const [email, setEmail]= useState('');
    const[password , setPassword]= useState('');
    function handleFormSubmit(ev) {
        ev.preventDefault(); //prevents degault submit behaviour of html.When a form is submitted, the browser's default behavior is to reload the page.ev.preventDefault() stops this default behavior, so the form submission is handled entirely by JavaScript.
        // sending request to register route.
        fetch('/api/register',{ //endpoint where registration data is sent.
            method: 'POST', //http method for the request.
            body: JSON.stringify({email, password}), // Converting form data into a JSON string.
            headers: {
                'Content-Type': 'application/json' // Telling the server that the request body contains JSON data.
            }
        });
    }
    return (
        <section className="mt-8">
            <h1 className="text-4xl text-center text-primary mb-4">Register</h1>
            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                {/* styling of these form is done in global.css file beacause all need same kind of styling */}
                <input 
                     type="email" placeholder="email id" 
                     value={email}
                     onChange={ev => setEmail(ev.target.value)}
                />
                <input 
                     type="password" placeholder="password"
                     value={password}
                     onChange={ev => setPassword(ev.target.value)}
                />
                <button type="submit"> Register </button>
                <div className="text-center text-gray-500 my-4">or login with provider</div>
                <button className="flex  justify-center gap-4">
                    <Image src="/google-icon.png" alt="" width={24} height={24} />
                    Login with Google
                </button>
            </form>
        </section>
    );
}

// These useState hooks are used to create and manage local state in the Registerpage component. 
// They will track user input in the email and password fields.

// What Happens Here:
// When useState('') is called:
// email is initialized with the empty string ''.
// setEmail is defined as a function to update email's value.
// Whenever setEmail is called with a new value, React updates email and re-renders the component to reflect the new state