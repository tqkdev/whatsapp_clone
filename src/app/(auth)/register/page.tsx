import Image from 'next/image';
import FormRegister from './FormRegister/FormRegister';

function Login() {
    return (
        <div className="w-full flex justify-center">
            <div className="w-full mx-3 md:w-[50%] lg:w-[35%] mt-10 p-8 shadow-login">
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
                    <h2 className="text-2xl font-semibold">Create account!</h2>
                </div>
                <FormRegister />
            </div>
        </div>
    );
}

export default Login;