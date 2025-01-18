'use server'
 


interface Idata{
    data:string[]
}

interface IClickResponse extends Idata{
    success:boolean,
}

 export async function clickmeBay():Promise<IClickResponse>{
    return {success:true, data: ["im clicked"]} as IClickResponse
 }