import React, { useEffect, useState, useRef } from "react"
import { ethers } from "ethers"
import Web3Modal from "web3modal"
import { transactionAddress, transactionABI } from "../../constants"

export const TransactionContext = React.createContext()


export const TransactionProvider = ({ children }) => {

    const web3ModalRef = useRef()

    const [walletConnected, setWalletConnected] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData,setFormData]=useState({addressTo:"",amount:"",keyword:"",messsage:""})
    
    const [transactionCount,setTransactionCount]=useState(0)
    const [transactions,setTransactions]=useState([])
    
    
    const [currentAccount,setCurrentAccount]=useState("")

    const handleChange=(e,name)=>{
        setFormData((prevState)=>({ ...prevState,[name]:e.target.value}))
    }

    const getAllTransactions=async()=>{
        try {
            const transactionContract=await getEhereumContract()
            const availableTransactions=await transactionContract.getAllTransactions()
            
            const structuredTransactions=availableTransactions.map((transaction)=>({
                addressTo:transaction.receiver,
                addressFrom:transaction.sender,
                timestamp:new Date(transaction.timestamp.toNumber()*1000).toLocaleString(),
                message:transaction.message,
                keyword:transaction.keyword,
                amount:parseInt(transaction.amount._hex)/(10**18)
            }))
            
            console.log(structuredTransactions)
            setTransactions(structuredTransactions)
        } catch (error) {
            console.error(error)
        }
    }

    const getEhereumContract = async () => {
        const provider = await getProviderOrSigner()
        const signer = await getProviderOrSigner(true)
        const transactionContract = new ethers.Contract(transactionAddress, transactionABI, signer)

        return transactionContract
    }

    const getProviderOrSigner = async (needSigner = false) => {
        const provider = await web3ModalRef.current.connect()
        const web3Provider = new ethers.providers.Web3Provider(provider)

        const { chainId } = await web3Provider.getNetwork()
        if (chainId !== 5) {
            window.alert("Change the network to Goerli")
            throw new Error("Change network to Goerli")
        }

        if (needSigner) {
            const signer = await web3Provider.getSigner()
            return signer
        }

        return web3Provider
    }

    const checkIfTransactionExist=async()=>{
        try {
            const transactionContract=await getEhereumContract()
            const transactionCount=await transactionContract.getTransactionCount()

            window.localStorage.setItem("transactionCount",transactionCount)
        } catch (error) {
            console.error(error)
        }
    }

    const connectWallet = async () => {
        try {
            const signer=await getProviderOrSigner(true)
            const add=await signer.getAddress()
            console.log(add)
            setCurrentAccount(add)
            setWalletConnected(true)
            await getAllTransactions()
        } catch (error) {
            console.error(error)
        }
    }

    const sendTransaction=async()=>{
        try {
            const {addressTo,amount,keyword,message}=formData
            const parsedAmount=ethers.utils.parseEther(amount)
            
            const transactionContract=await getEhereumContract()

            const tx=await transactionContract.addToBlockchain(addressTo,message,keyword,{value:parsedAmount})
            setIsLoading(true)
            console.log(`Loading-${tx.hash}`)
            await tx.wait()
            setIsLoading(false)
            console.log(`Success-${tx.hash}`)
            
            const transactionCount=await transactionContract.getTransactionCount()
            setTransactionCount(transactionCount.toNumber())

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
       
        if (!walletConnected) {

            web3ModalRef.current = new Web3Modal({
                network: "goerli",
                providerOptions: {},
                disableInjectedProvider: false,
            })
            connectWallet()
            setTransactionCount(localStorage.getItem("transactionCount"))
            checkIfTransactionExist()
        }

    }, [walletConnected,transactions])

    return (
        <TransactionContext.Provider value={{connectWallet,walletConnected,formData,setFormData,handleChange,sendTransaction,currentAccount,transactions,isLoading}}>
            {children}
        </TransactionContext.Provider>
    )
}