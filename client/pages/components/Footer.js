import styles from "../../styles/Home.module.css"

const Footer = () => {
    return (
        <div className={`w-full flex md:justify-center justify-between items-center flex-col p-4 ${styles.gradientbgfooter}`}>
            <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
                <div className="flex flex-[0.5] justify-center items-center">
                    <img src="./logo.png" alt="logo" className="w-32" />
                </div>
                <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
                    <p className="text-white text-base text-center mx-2 cursor-pointer">Market</p>
                    <p className="text-white text-base text-center mx-2 cursor-pointer">Exchange</p>
                    <p className="text-white text-base text-center mx-2 cursor-pointer">Tutorial</p>
                    <p className="text-white text-base text-center mx-2 cursor-pointer">Wallets</p>
                </div>
            </div>
            <div className="flex justify-center items-center flex-col mt-5">
                <p className="text-white text-sm text-center">Donate To Us At</p>
                <p className="text-red-600 text-sm text-center font-bold">0x2160D41c9D711Ca3fA7777211148538eeb431970</p>
            </div>

            <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

            <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
                <p className="text-white text-left text-xs">ragingrahul2022</p>
                <p className="text-white text-right text-xs">All rights reserved</p>
            </div>
        </div>
    )
}

export default Footer