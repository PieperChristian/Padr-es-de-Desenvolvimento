import inquirer, { InputQuestion, ConfirmQuestion } from 'inquirer';
import { ListQuestion, RawListQuestion } from 'inquirer';

export const criarPromptNumero = (
    name: string,
    message: string,
    opts?: { min?: number; invalidMessage?: string }
): InputQuestion => ({
    type: 'input',
    name,
    message,
    filter: (input: string) => parseFloat(String(input).replace(',', '.')),
    validate: (input: string) => {
        const valor = parseFloat(String(input).replace(',', '.'));
        if (isNaN(valor)) return 'Por favor, digite um número válido.';
        if (typeof opts?.min === 'number' && valor < opts.min)
            return opts.invalidMessage ?? `${message.split(' (')[0]} inválido.`;
        return true;
    }
});

export const criarPromptConfirmacao = (
    name: string,
    message: string,
    def = true
): ConfirmQuestion => ({
    type: 'confirm',
    name,
    message,
    default: def
});

export const perguntarNumero = async ( question: InputQuestion ): Promise<number> => {
    const res = await inquirer.prompt([question]);
    return res[(question as any).name] as number;
};

export const perguntarConfirmacao = async ( question: ConfirmQuestion ): Promise<boolean> => {
    const res = await inquirer.prompt([question]);
    return res[(question as any).name] as boolean;
};

/**
 * Criar prompt de menu (lista ou rawlist) reutilizável.
 * - `type` pode ser 'list' ou 'rawlist' (rawlist preservado nos menus atuais).
 * - `choices` recebe array de strings ou ChoiceOptions.
 */
export const criarPromptMenu = (
    name: string,
    message: string,
    choices: (string | inquirer.Separator)[],
    opts?: { raw?: boolean }
): ListQuestion | RawListQuestion => ({
    type: opts?.raw ? 'rawlist' : 'list',
    name,
    message,
    choices
});

export const perguntarMenu = async (question: ListQuestion | RawListQuestion): Promise<any> => {
    const res = await inquirer.prompt([question]);
    return res[(question as any).name];
};

export default {
    criarPromptNumero,
    criarPromptConfirmacao,
    perguntarNumero,
    perguntarConfirmacao,
    criarPromptMenu,
    perguntarMenu
};

