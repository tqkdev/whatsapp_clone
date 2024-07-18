import Image from 'next/image';
import FormLogin from './FormLogin/FormLogin';

function Login() {
    return (
        <div className="w-full flex justify-center h-screen">
            <div className="w-full h-fit mx-3 md:w-[50%] lg:w-[35%] relative mt-28 p-8 shadow-login">
                <div className="flex justify-center">
                    <div className="rounded-[50%] overflow-hidden">
                        <Image
                            src="https://res.cloudinary.com/dyoctwffi/image/upload/v1720449454/ORGAVIVE/whatsapp_ninxds.png"
                            width={50}
                            height={50}
                            alt="Picture of the author"
                        />
                    </div>
                </div>
                <div className="my-2 text-center">
                    <h2 className="text-2xl font-semibold">Welcome!</h2>
                    <p className="text-sm">Sign in to your account</p>
                </div>
                <FormLogin />
            </div>
        </div>
    );
}

export default Login;
