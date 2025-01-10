import Image from "next/image";
export default function Registerpage() {
    return (
        <section className="mt-8">
            <h1 className="text-4xl text-center text-primary mb-4">Register</h1>
            <form className="block max-w-xs mx-auto">
                {/* styling of these form is done in global.css file beacause all need same kind of styling */}
                <input type="email" placeholder="email id" />
                <input type="password" placeholder="password"/>
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