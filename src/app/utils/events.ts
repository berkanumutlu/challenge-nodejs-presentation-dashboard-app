export const createCustomEvent = (name: string, detail: any) => {
    return new CustomEvent(name, { detail });
};

export const PRESENTATION_CREATED = 'presentationCreated';
export const PRESENTATION_UPDATED = 'presentationUpdated';