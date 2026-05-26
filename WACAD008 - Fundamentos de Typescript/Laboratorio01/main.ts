export type LembreteTupla = [
    string,
    string,
    Date,
    Date,
    Date | null,
    string | null,
];

export type CredenciaisAutenticacao = {
    usuario: string;
    token: string;
}