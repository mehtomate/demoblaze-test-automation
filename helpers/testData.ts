export interface OrderDetails {
    name?: string;
    country?: string;
    city?: string;
    creditCard?: string;
    month?: string;
    year?: string;
}

export const defaultOrderData: Required<OrderDetails> = {
    name: 'Test Automation',
    country: 'Finland',
    city: 'Helsinki',
    creditCard: '123451234512345',
    month: '03',
    year: '2030',
};

export const defaultUserPassword = 'Password123!';
