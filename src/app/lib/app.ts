export const getAppName = () => process.env.NEXT_PUBLIC_APP_NAME || 'Default App Name';

export const getUploadFilePath = () => '/uploads';
export const getPresentationUploadFilePath = () => getUploadFilePath() + '/presentations';

export const getPresentationPlaceholderImage = () => '/images/presentation/placeholder.png';