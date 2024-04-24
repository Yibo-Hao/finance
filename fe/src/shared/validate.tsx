export type Errors<T> = {
    [k in keyof T]?: string[];
};

export type Rule<T> = {
  message: string;
  key: keyof T;
} & ({ type: "required" } | { type: "pattern"; pattern: RegExp });

export type Rules<T> = Rule<T>[];

export type FData = {
  [key: string]: string | number | null | undefined | FData;
};

export const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validate = <T extends FData>(formData: T, rules: Rules<T>): Errors<T> => {
    const errors: Errors<T> = {};
    rules.map((rule) => {
        if (rule.type === "required" && !formData[rule.key]) {
            errors[rule.key] = errors[rule.key] ?? [];
            errors[rule.key]?.push(rule.message);
        }

        if (rule.type === "pattern" && !rule.pattern.test(formData[rule.key] as string)) {
            errors[rule.key] = errors[rule.key] ?? [];
            errors[rule.key]?.push(rule.message);
        }
    });
  
    return errors;
};
 