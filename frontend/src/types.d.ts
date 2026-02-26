export interface IMessages{
    id: string;
    author: '',
    message: '',
    image: string | null;
}


export interface MessageMutation{
    author: '',
    message: '',
    image: File | null;
}