export const UserModelConfig = {
    hiddenAttributes: ['id', 'password', 'role', 'status', 'updatedAt', 'deletedAt'],
    guardedAttributes: ['id', 'role', 'status', 'createdAt', 'updatedAt', 'deletedAt'],
    encryptAttributes: ['password']
};
export const PresentationModelConfig = {
    hiddenAttributes: ['id', 'userId'],
    guardedAttributes: ['id', 'userId', 'status', 'createdAt', 'updatedAt']
};