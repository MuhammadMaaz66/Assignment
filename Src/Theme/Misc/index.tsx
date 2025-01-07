import { Alert, Platform } from 'react-native';
import {
    checkMultiple,
    openSettings,
    PERMISSIONS,
    requestMultiple,
} from 'react-native-permissions';

const galleryPermission =
    Platform.OS == 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;

const locationPermission =
    Platform.OS == 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

const notificationPermission = PERMISSIONS.ANDROID.POST_NOTIFICATIONS;

const locationCoarsePermission =
    Platform.OS == 'ios'
        ? PERMISSIONS.IOS.LOCATION_ALWAYS
        : PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION;
const cameraPermission =
    Platform.OS == 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;

export const requestPermissionsForLocation = sendPermissionStatus => {
    requestMultiple([locationPermission, locationCoarsePermission]).then(
        status => {
            const multiplePermissions = Object?.values(status);
            if (
                multiplePermissions[0] == 'granted' ||
                multiplePermissions[0] == 'unavailable'
            ) {
                sendPermissionStatus(true);
                return true;
            } else {
                sendPermissionStatus(false);
                permissionAlert('Location', () => {
                    sendPermissionStatus(false);
                });
                return status;
            }
        },
    );
};
export const requestPermissionsForNotification = sendPermissionStatus => {
    requestMultiple([notificationPermission]).then(status => {
        const multiplePermissions = Object?.values(status);
        if (
            multiplePermissions[0] == 'granted' ||
            multiplePermissions[0] == 'unavailable'
        ) {
            return true;
        } else {
            permissionAlert('Push notification', () => { });
            return status;
        }
    });
};
export const requestGalleryPermission = sendPermissionStatus => {
    requestMultiple([galleryPermission]).then(status => {
        const multiplePermissions = Object?.values(status);
        if (
            multiplePermissions[0] == 'granted' ||
            multiplePermissions[0] == 'unavailable'
        ) {
            sendPermissionStatus(true);
            return true;
        } else {
            sendPermissionStatus(false);
            permissionAlert('Gallery', () => {
                sendPermissionStatus(false);
            });
            return status;
        }
    });
};

export const checkGalleryPermission = sendPermissionStatus => {
    checkMultiple([galleryPermission]).then(statuses => {
        if (
            statuses[galleryPermission] == 'blocked' ||
            statuses[galleryPermission] == 'denied'
        ) {
            sendPermissionStatus(false);
        } else if (
            statuses[galleryPermission] == 'granted' ||
            statuses[galleryPermission] == 'unavailable'
        ) {
            sendPermissionStatus(true);
        } else {
            sendPermissionStatus(false);
        }
    });
};

export const checkPermissionForLocation = sendPermissionStatus => {
    checkMultiple([locationPermission, locationCoarsePermission]).then(
        statuses => {
            if (
                statuses[locationPermission] == 'blocked' ||
                statuses[locationPermission] == 'denied'
            ) {
                sendPermissionStatus(false);
            } else if (
                statuses[locationPermission] == 'granted' ||
                statuses[locationPermission] == 'unavailable'
            ) {
                sendPermissionStatus(true);
            } else {
                sendPermissionStatus(false);
            }
        },
    );
};

export const requestPermissionsForCamera = sendPermissionStatus => {
    requestMultiple([cameraPermission]).then(status => {
        const multiplePermissions = Object?.values(status);
        if (
            multiplePermissions[0] == 'granted' ||
            multiplePermissions[0] == 'unavailable'
        ) {
            sendPermissionStatus(true);
            return true;
        } else {
            sendPermissionStatus(false);
            permissionAlert('Camera', () => {
                sendPermissionStatus(false);
            });
            return status;
        }
    });
};
export const checkPermissionForCamera = sendPermissionStatus => {
    checkMultiple([cameraPermission]).then(statuses => {
        if (
            statuses[cameraPermission] == 'blocked' ||
            statuses[cameraPermission] == 'denied'
        ) {
            sendPermissionStatus(false);
        } else if (
            statuses[cameraPermission] == 'granted' ||
            statuses[cameraPermission] == 'unavailable'
        ) {
            sendPermissionStatus(true);
        } else {
            sendPermissionStatus(false);
        }
    });
};

export function permissionAlert(type, onPressCancel) {
    Alert.alert(
        'Permission ',
        `Goto Settings > ${'GlamourGo'} > ${type} > allow GlamourGo to access your ${type}`,
        [
            {
                text: 'Cancel',
                onPress: () => {
                    if (typeof onPressCancel === 'function') {
                        onPressCancel();
                    }
                },
            },
            {
                text: 'Open Settings',
                onPress: async () => {
                    try {
                        openSettings();
                    } catch { }
                },
            },
        ],
        { cancelable: false },
    );
}
