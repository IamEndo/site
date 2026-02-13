export const device = {
  name: 'ESP32 Display 2.8"',
  model: "ESP32-2432S028",
  purchaseUrl: "https://www.aliexpress.com/w/wholesale-ESP32-Arduino-LVGL-WIFI%26Bluetooth-2.8-TFT-Display.html",
  specs: [
    { label: "Display", value: '2.8" TFT touchscreen' },
    { label: "Resolution", value: "320×240 pixels" },
    { label: "Connectivity", value: "WiFi + USB-C" },
    { label: "Graphics", value: "ST7789 / LVGL" },
  ],
  highlights: [
    "Compact form factor",
    "Low power consumption", 
    "Widely available globally",
    "No ongoing costs",
  ],
} as const;

export type Device = typeof device;
