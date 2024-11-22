export const UserModelConfig = {
    visibleAttributes: ['firstName', 'lastName', 'email', 'avatar', 'createdAt'],
    hiddenAttributes: ['password', 'role', 'status', 'updatedAt', 'deletedAt'],
    guardedAttributes: ['id', 'role', 'status', 'createdAt', 'updatedAt', 'deletedAt', 'presentations'],
    encryptAttributes: ['password']
};
export const PresentationModelConfig = {
    hiddenAttributes: ['userId'],
    guardedAttributes: ['id', 'userId', 'status', 'createdAt', 'updatedAt', 'users'],
    searchableAttributes: ['name', 'thumbnailImage', 'createdAt']
};