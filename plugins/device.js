export default function ({ $device }) {
  $device.isIE = /MSIE|Trident/.test($device.userAgent);
  $device.isOperaMini = /Opera Mini/.test($device.userAgent);
}
