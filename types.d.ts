/**
 * Class containing utility functions for the [Bangle.js Smart Watch](http://www.espruino.com/Bangle.js)
 */
class Bangle {
  /**
   * Returns the rectangle on the screen that is currently
   * reserved for the app.
   */
  static appRect: any

  /**
   * Feature flag - If true, this Bangle.js firmware reads `setting.json` and
   * modifies beep & buzz behaviour accordingly (the bootloader
   * doesn't need to do it).
   */
  static F_BEEPSET: boolean

  /**
   * Accelerometer data available with `{x,y,z,diff,mag}` object as a parameter.
   * 
   * * `x` is X axis (left-right) in `g`
   * * `y` is Y axis (up-down) in `g`
   * * `z` is Z axis (in-out) in `g`
   * * `diff` is difference between this and the last reading in `g`
   * * `mag` is the magnitude of the acceleration in `g`
   * 
   * You can also retrieve the most recent reading with `Bangle.getAccel()`.
   * @param xyz 
   */
  on(event: 'accel', callback: (xyz: {x: number, y: number, z: number, diff: number, mag: number}) => void): void

  /**
   * Emitted when a 'gesture' (fast movement) is detected, and a Tensorflow model is in
   * storage in the `".tfmodel"` file.
   * 
   * If a `".tfnames"` file is specified as a comma-separated list of names, it will be used
   * to decode `gesture` from a number into a string.
   * @param gesture The name of the gesture (if '.tfnames' exists, or the index. 'undefined' if not matching
   * @param weights An array of floating point values output by the model
   */
  on(event: 'aiGesture', callback: (gesture: string, weights: number[]) => void): void

  /**
   * Is the battery charging or not?
   * @param charging `true` if charging
   */
  on(event: 'charging', callback: (charging: boolean) => void): void

  /**
   * Emitted when the touchscreen is dragged or released
   * 
   * The touchscreen extends past the edge of the screen and while
   * `x` and `y` coordinates are arranged such that they align with
   * the LCD's pixels, if your finger goes towards the edge of the
   * screen, `x` and `y` could end up larger than 175 (the screen's maximum pixel coordinates)
   * or smaller than 0. Coordinates from the `touch` event are clipped.
   * @param event Object of form `{x,y,dx,dy,b}` containing touch coordinates, difference in touch coordinates, and an integer `b` containing number of touch points (currently 1 or 0)
   */
  on(event: 'drag', callback: (event: {x:number,y:number,dx:number,dy:number,b:number}) => void): void

  /**
   * Has the watch been moved so that it is face-up, or not face up?
   * @param up `true` if face-up
   */
  on(event: 'faceUp', callback: (up: boolean) => void): void

  /**
   * Emitted when a 'gesture' (fast movement) is detected
   * @param xyz An Int8Array of XYZXYZXYZ data
   */
  on(event: 'gesture', callback: (xyz: Int8Array) => void): void

  /**
   * GPS data, as an object. Contains:
   * 
   * ```
   * { "lat": number,      // Latitude in degrees
   *   "lon": number,      // Longitude in degrees
   *   "alt": number,      // altitude in M
   *   "speed": number,    // Speed in kph
   *   "course": number,   // Course in degrees
   *   "time": Date,       // Current Time (or undefined if not known)
   *   "satellites": 7,    // Number of satellites
   *   "fix": 1            // NMEA Fix state - 0 is no fix
   *   "hdop": number,     // Horizontal Dilution of Precision
   * }
   * ```
   * 
   * If a value such as `lat` is not known because there is no fix, it'll be `NaN`.
   * 
   * `hdop` is a value from the GPS receiver that gives a rough idea of accuracy
   * of lat/lon based on the geometry of the satellites in range. Multiply by 5 to
   * get a value in meters. This is just a ballpark estimation and should
   * not be considered remotely accurate.
   * 
   * To get this event you must turn the GPS on
   * with `Bangle.setGPSPower(1)`.
   * @param fix An object with fix info (see below)
   */
  on(event: 'GPS', callback: (fix: {lat:number, lon:rumber,alt:number,speed:number,course:number,time:Date,sattelites:number,fix:number,hdop:number}) => void): void

  /**
   * Raw NMEA GPS / u-blox data messages received as a string
   * 
   * To get this event you must turn the GPS on
   * with `Bangle.setGPSPower(1)`.
   * @param nmea A string containing the raw NMEA data from the GPS
   * @param dataLoss This is set to true if some lines of GPS data have previously been lost (eg because system was too busy to queue up a GPS-raw event)
   */
  on(event: 'GPS-raw', callback: (nmea: any, dataLoss: boolean) => void): void

  /**
   * See `Bangle.getHealthStatus()` for more information. This is used for health tracking to
   * allow Bangle.js to record historical exercise data.
   * @param info An object containing the last 10 minutes health data
   */
  on(event: 'health', callback: (info: {}) => void): void

  /**
   * Heat rate data, as an object. Contains:
   * 
   * ```
   * { "bpm": number,             // Beats per minute
   *   "confidence": number,      // 0-100 percentage confidence in the heart rate
   *   "raw": Uint8Array,         // raw samples from heart rate monitor
   * }
   * ```
   * 
   * To get this event you must turn the heart rate monitor on
   * with `Bangle.setHRMPower(1)`.
   * @param hrm An object with heart rate info (see below)
   */
  on(event: 'HRM', callback: (hrm: {bpm:number,confidence:number,raw:Uint8Array}) => void): void

  /**
   * Called when heart rate sensor data is available - see `Bangle.setHRMPower(1)`.
   * 
   * `hrm` is of the form:
   * 
   * ```
   * { "raw": -1,       // raw value from sensor
   *   "filt": -1,      // bandpass-filtered raw value from sensor
   *   "bpm": 88.9,     // last BPM value measured
   *   "confidence": 0  // confidence in the BPM value
   * }
   * ```
   * @param hrm A object containing instant readings from the heart rate sensor
   */
  on(event: 'HRM-raw', callback: (hrm: {raw:number,filt:number,bpm:number,confidence:number}) => void): void

  /**
   * Has the screen been turned on or off? Can be used to stop tasks that are no longer useful if nothing is displayed.  Also see `Bangle.isLCDOn()`
   * @param on `true` if screen is on
   */
  on(event: 'lcdPower', callback: (on: boolean) => void): void

  /**
   * Has the screen been locked? Also see `Bangle.isLocked()`
   * @param on `true` if screen is locked, `false` if it is unlocked and touchscreen/buttons will work
   */
  on(event: 'lock', callback: (on: boolean) => void): void

  /**
   * Magnetometer/Compass data available with `{x,y,z,dx,dy,dz,heading}` object as a parameter
   * 
   * * `x/y/z` raw x,y,z magnetometer readings
   * * `dx/dy/dz` readings based on calibration since magnetometer turned on
   * * `heading` in degrees based on calibrated readings (will be NaN if magnetometer hasn't been rotated around 360 degrees)
   * 
   * To get this event you must turn the compass on
   * with `Bangle.setCompassPower(1)`.
   * 
   * You can also retrieve the most recent reading with `Bangle.getCompass()`.
   * @param xyz 
   */
  on(event: 'mag', callback: (xyz: {x: number, y: number, z: number, dx: number, dy: number, dz: number, heading: number}) => void): void

  /**
   * Emitted at midnight (at the point the `day` health info is reset to 0).
   * 
   * Can be used for housekeeping tasks that don't want to be run during the day.
   */
  on(event: 'midnight', callback: () => void): void

  /**
   * When `Bangle.setBarometerPower(true)` is called, this event is fired containing barometer readings.
   * 
   * Same format as `Bangle.getPressure()`
   * @param e An object containing `{temperature,pressure,altitude}`
   */
  on(event: 'pressure', callback: (e: {temperature:number,pressure:number,altitude:number}) => void): void

  /**
   * Called whenever a step is detected by Bangle.js's pedometer.
   * @param up The number of steps since Bangle.js was last reset
   */
  on(event: 'step', callback: (up: number) => void): void

  /**
   * Emitted when the touchscreen is dragged for a large enough distance to count as a gesture.
   * 
   * If Bangle.strokes is defined and populated with data from `Unistroke.new`, the `event` argument will also
   * contain a `stroke` field containing the most closely matching stroke name.
   * 
   * For example:
   * 
   * ```
   * Bangle.strokes = {
   *   up : Unistroke.new(new Uint8Array([57, 151, ... 158, 137])),
   *   alpha : Unistroke.new(new Uint8Array([161, 55, ... 159, 161])),
   * };
   * Bangle.on('stroke',o=>{
   *   print(o.stroke);
   *   g.clear(1).drawPoly(o.xy);
   * });
   * // Might print something like
   * {
   *   "xy": new Uint8Array([149, 50, ... 107, 136]),
   *   "stroke": "alpha"
   * }
   * ```
   * @param event Object of form `{xy:Uint8Array([x1,y1,x2,y2...])}` containing touch coordinates
   */
  on(event: 'stroke', callback: (event: {xy:Uint8Array}) => void): void

  /**
   * Emitted when a swipe on the touchscreen is detected (a movement from left->right, right->left, down->up or up->down)
   * 
   * Bangle.js 1 is only capable of detecting left/right swipes as it only contains a 2 zone touchscreen.
   * @param directionLR `-1` for left, `1` for right, `0` for up/down
   * @param directionUD `-1` for up, `1` for down, `0` for left/right (Bangle.js 2 only)
   */
  on(event: 'swipe', callback: (directionLR: number, directionUD: number) => void): void

  /**
   * If the watch is tapped, this event contains information on the way it was tapped.
   * 
   * `dir` reports the side of the watch that was tapped (not the direction it was tapped in).
   * 
   * ```
   * {
   *   dir : "left/right/top/bottom/front/back",
   *   double : true/false // was this a double-tap?
   *   x : -2 .. 2, // the axis of the tap
   *   y : -2 .. 2, // the axis of the tap
   *   z : -2 .. 2 // the axis of the tap
   * ```
   * @param data `{dir, double, x, y, z}`
   */
  on(event: 'tap', callback: (data: {dir:'left/right/top/bottom/front/back'}) => void): void

  /**
   * Emitted when the touchscreen is pressed
   * @param button `1` for left, `2` for right
   * @param xy Object of form `{x,y}` containing touch coordinates (if the device supports full touch). Clipped to 0..175 (LCD pixel coordinates) on firmware 2v13 and later.
   */
  on(event: 'touch', callback: (button: number, xy: {x:number,y:number}) => void): void

  /**
   * This event happens when the watch has been twisted around it's axis - for instance as if it was rotated so someone could look at the time.
   * 
   * To tweak when this happens, see the `twist*` options in `Bangle.setOptions()`
   */
  on(event: 'twist', callback: () => void): void

  /**
   * Reads a register from the accelerometer
   * 
   * **Note:** On Espruino 2v06 and before this function only returns a number (`cnt` is ignored).
   * @param reg 
   * @param cnt If specified, returns an array of the given length (max 128). If not (or 0) it returns a number
   */
  static accelRd(reg: number, cnt: number): any

  /**
   * Writes a register on the accelerometer
   * @param reg 
   * @param data 
   */
  static accelWr(reg: number, data: number): void

  /**
   * Reads a register from the barometer IC
   * @param reg 
   * @param cnt If specified, returns an array of the given length (max 128). If not (or 0) it returns a number
   */
  static barometerRd(reg: number, cnt: number): any

  /**
   * Writes a register on the barometer IC
   * @param reg 
   * @param data 
   */
  static barometerWr(reg: number, data: number): void

  /**
   * Use the piezo speaker to Beep for a certain time period and frequency
   * @param time Time in ms (default 200)
   * @param freq Frequency in hz (default 4000)
   */
  static beep(time: number, freq: number): Promise

  /**
   * Use the vibration motor to buzz for a certain time period
   * @param time Time in ms (default 200)
   * @param strength Power of vibration from 0 to 1 (Default 1)
   */
  static buzz(time: number, strength: number): Promise

  /**
   * Read a register on the Magnetometer/Compass
   * @param reg 
   * @param cnt If specified, returns an array of the given length (max 128). If not (or 0) it returns a number
   */
  static compassRd(reg: number, cnt: number): any

  /**
   * Writes a register on the Magnetometer/Compass
   * @param reg 
   * @param data 
   */
  static compassWr(reg: number, data: number): void

  /**
   * Reads debug info
   */
  static dbg(): any

  /**
   * Draw any onscreen widgets that were loaded with `Bangle.loadWidgets()`.
   * 
   * Widgets should redraw themselves when something changes - you'll only
   * need to call drawWidgets if you decide to clear the entire screen
   * with `g.clear()`.
   */
  static drawWidgets(): void

  /**
   */
  static drawWidgets(): void

  /**
   * Erase all storage and reload it with the default
   * contents.
   * 
   * This is only available on Bangle.js 2.0. On Bangle.js 1.0
   * you need to use `Install Default Apps` under the `More...` tab
   * of http://banglejs.com/apps
   */
  static factoryReset(): void

  /**
   * Get the most recent accelerometer reading. Data is in the same format as the `Bangle.on('accel',` event.
   * 
   * * `x` is X axis (left-right) in `g`
   * * `y` is Y axis (up-down) in `g`
   * * `z` is Z axis (in-out) in `g`
   * * `diff` is difference between this and the last reading in `g` (calculated by comparing vectors, not magnitudes)
   * * `td` is the elapsed
   * * `mag` is the magnitude of the acceleration in `g`
   */
  static getAccel(): any

  /**
   * Get the most recent Magnetometer/Compass reading. Data is in the same format as the `Bangle.on('mag',` event.
   * 
   * Returns an `{x,y,z,dx,dy,dz,heading}` object
   * 
   * * `x/y/z` raw x,y,z magnetometer readings
   * * `dx/dy/dz` readings based on calibration since magnetometer turned on
   * * `heading` in degrees based on calibrated readings (will be NaN if magnetometer hasn't been rotated around 360 degrees)
   * 
   * To get this event you must turn the compass on
   * with `Bangle.setCompassPower(1)`.
   */
  static getCompass(): any

  /**
   * Get the last available GPS fix info (or `undefined` if GPS is off).
   * 
   * The fix info received is the same as you'd get from the `Bangle.GPS` event.
   */
  static getGPSFix(): any

  /**
   * `range` is one of:
   * 
   * * `undefined` or `'current'` - health data so far in the last 10 minutes is returned,
   * * `'last'` - health data during the last 10 minutes
   * * `'day'` - the health data so far for the day
   * 
   * 
   * `getHealthStatus` returns an object containing:
   * 
   * * `movement` is the 32 bit sum of all `acc.diff` readings since power on (and rolls over). It is the difference in accelerometer values as `g*8192`
   * * `steps` is the number of steps during this period
   * * `bpm` the best BPM reading from HRM sensor during this period
   * * `bpmConfidence` best BPM confidence (0-100%) during this period
   * @param range What time period to return data for, see below:
   */
  static getHealthStatus(range: any): any

  /**
   * The current LCD mode.
   * 
   * See `Bangle.setLCDMode` for examples.
   */
  static getLCDMode(): any

  /**
   * * On platforms with an LCD of >=8bpp this is 222 x 104 x 2 bits
   * * Otherwise it's 119 x 56 x 1 bits
   */
  static getLogo(): any

  /**
   * Return the current state of options as set by `Bangle.setOptions`
   */
  static getOptions(): any

  /**
   * Read temperature, pressure and altitude data. A promise is returned
   * which will be resolved with `{temperature, pressure, altitude}`.
   * 
   * If the Barometer has been turned on with `Bangle.setBarometerPower` then this will
   * return almost immediately with the reading. If the Barometer is off, conversions take
   * between 500-750ms.
   * 
   * Altitude assumes a sea-level pressure of 1013.25 hPa
   * 
   * ```
   * Bangle.getPressure().then(d=>{
   *   console.log(d);
   *   // {temperature, pressure, altitude}
   * });
   * ```
   */
  static getPressure(): any

  /**
   * Returns the current amount of steps recorded by the step counter
   */
  static getStepCount(): number

  /**
   * Read a register on the Heart rate monitor
   * @param reg 
   * @param cnt If specified, returns an array of the given length (max 128). If not (or 0) it returns a number
   */
  static hrmRd(reg: number, cnt: number): any

  /**
   * Writes a register on the Heart rate monitor
   * @param reg 
   * @param data 
   */
  static hrmWr(reg: number, data: number): void

  /**
   * Changes a pin state on the IO expander
   * @param mask 
   * @param isOn 
   */
  static ioWr(mask: number, isOn: number): void

  /**
   * Is the Barometer powered?
   * 
   * Set power with `Bangle.setBarometerPower(...);`
   */
  static isBarometerOn(): boolean

  /**
   */
  static isCharging(): boolean

  /**
   * Is the compass powered?
   * 
   * Set power with `Bangle.setCompassPower(...);`
   */
  static isCompassOn(): boolean

  /**
   * Is the GPS powered?
   * 
   * Set power with `Bangle.setGPSPower(...);`
   */
  static isGPSOn(): boolean

  /**
   * Is the Heart rate monitor powered?
   * 
   * Set power with `Bangle.setHRMPower(...);`
   */
  static isHRMOn(): boolean

  /**
   * Also see the `Bangle.lcdPower` event
   */
  static isLCDOn(): boolean

  /**
   * Also see the `Bangle.lock` event
   */
  static isLocked(): boolean

  /**
   * Writes a command directly to the ST7735 LCD controller
   * @param cmd 
   * @param data 
   */
  static lcdWr(cmd: number, data: any): void

  /**
   * Load all widgets from flash Storage. Call this once at the beginning
   * of your application if you want any on-screen widgets to be loaded.
   * 
   * They will be loaded into a global `WIDGETS` array, and
   * can be rendered with `Bangle.drawWidgets`.
   */
  static loadWidgets(): void

  /**
   * Turn Bangle.js off. It can only be woken by pressing BTN1.
   */
  static off(): void

  /**
   * Perform a Spherical [Web Mercator projection](https://en.wikipedia.org/wiki/Web_Mercator_projection)
   * of latitude and longitude into `x` and `y` coordinates, which are roughly
   * equivalent to meters from `{lat:0,lon:0}`.
   * 
   * This is the formula used for most online mapping and is a good way
   * to compare GPS coordinates to work out the distance between them.
   * @param latlong `{lat:..., lon:...}`
   */
  static project(latlong: any): any

  /**
   * Resets the compass minimum/maximum values. Can be used if the compass isn't
   * providing a reliable heading any more.
   */
  static resetCompass(): void

  /**
   * Set the power to the barometer IC. Once enbled, `Bangle.pressure` events
   * are fired each time a new barometer reading is available.
   * 
   * When on, the barometer draws roughly 50uA
   * @param isOn True if the barometer IC should be on, false if not
   * @param appID A string with the app's name in, used to ensure one app can't turn off something another app is using
   */
  static setBarometerPower(isOn: boolean, appID: any): boolean

  /**
   * Set the power to the Compass
   * 
   * When on, data is output via the `mag` event on `Bangle`:
   * 
   * ```
   * Bangle.setCompassPower(true, "myapp");
   * Bangle.on('mag',print);
   * ```
   * 
   * *When on, the compass draws roughly 2mA*
   * @param isOn True if the Compass should be on, false if not
   * @param appID A string with the app's name in, used to ensure one app can't turn off something another app is using
   */
  static setCompassPower(isOn: boolean, appID: any): boolean

  /**
   * Set the power to the GPS.
   * 
   * When on, data is output via the `GPS` event on `Bangle`:
   * 
   * ```
   * Bangle.setGPSPower(true, "myapp");
   * Bangle.on('GPS',print);
   * ```
   * 
   * *When on, the GPS draws roughly 20mA*
   * @param isOn True if the GPS should be on, false if not
   * @param appID A string with the app's name in, used to ensure one app can't turn off something another app is using
   */
  static setGPSPower(isOn: boolean, appID: any): boolean

  /**
   * Set the power to the Heart rate monitor
   * 
   * When on, data is output via the `HRM` event on `Bangle`:
   * 
   * ```
   * Bangle.setHRMPower(true, "myapp");
   * Bangle.on('HRM',print);
   * ```
   * 
   * *When on, the Heart rate monitor draws roughly 5mA*
   * @param isOn True if the heart rate monitor should be on, false if not
   * @param appID A string with the app's name in, used to ensure one app can't turn off something another app is using
   */
  static setHRMPower(isOn: boolean, appID: any): boolean

  /**
   * This function can be used to adjust the brightness of Bangle.js's display, and
   * hence prolong its battery life.
   * 
   * Due to hardware design constraints, software PWM has to be used which
   * means that the display may flicker slightly when Bluetooth is active
   * and the display is not at full power.
   * 
   * **Power consumption**
   * 
   * * 0 = 7mA
   * * 0.1 = 12mA
   * * 0.2 = 18mA
   * * 0.5 = 28mA
   * * 0.9 = 40mA (switching overhead)
   * * 1 = 40mA
   * @param brightness The brightness of Bangle.js's display - from 0(off) to 1(on full)
   */
  static setLCDBrightness(brightness: number): void

  /**
   * This function can be used to change the way graphics is handled on Bangle.js.
   * 
   * Available options for `Bangle.setLCDMode` are:
   * 
   * * `Bangle.setLCDMode()` or `Bangle.setLCDMode("direct")` (the default) - The drawable area is 240x240 16 bit. Unbuffered, so draw calls take effect immediately. Terminal and vertical scrolling work (horizontal scrolling doesn't).
   * * `Bangle.setLCDMode("doublebuffered")` - The drawable area is 240x160 16 bit, terminal and scrolling will not work. `g.flip()` must be called for draw operations to take effect.
   * * `Bangle.setLCDMode("120x120")` - The drawable area is 120x120 8 bit, `g.getPixel`, terminal, and full scrolling work. Uses an offscreen buffer stored on Bangle.js, `g.flip()` must be called for draw operations to take effect.
   * * `Bangle.setLCDMode("80x80")` - The drawable area is 80x80 8 bit, `g.getPixel`, terminal, and full scrolling work. Uses an offscreen buffer stored on Bangle.js, `g.flip()` must be called for draw operations to take effect.
   * 
   * You can also call `Bangle.setLCDMode()` to return to normal, unbuffered `"direct"` mode.
   * @param mode The LCD mode (See below)
   */
  static setLCDMode(mode: any): void

  /**
   * This can be used to move the displayed memory area up or down temporarily. It's
   * used for displaying notifications while keeping the main display contents
   * intact.
   * @param y The amount of pixels to shift the LCD up or down
   */
  static setLCDOffset(y: number): void

  /**
   * This function can be used to turn Bangle.js's LCD off or on.
   * 
   * This function resets the Bangle's 'activity timer' (like
   * pressing a button or the screen would) so after a time period
   * of inactivity set by `Bangle.setLCDTimeout` the screen will
   * turn off.
   * 
   * If you want to keep the screen on permanently (until apps
   * are changed) you can do:
   * 
   * ```
   * Bangle.setLCDTimeout(0); // turn off the timeout
   * Bangle.setLCDPower(1); // keep screen on
   * ```
   * 
   * 
   * **When on full, the LCD draws roughly 40mA.** You can adjust
   * When brightness using `Bange.setLCDBrightness`.
   * @param isOn True if the LCD should be on, false if not
   */
  static setLCDPower(isOn: boolean): void

  /**
   * This function can be used to turn Bangle.js's LCD power saving on or off.
   * 
   * With power saving off, the display will remain in the state you set it with `Bangle.setLCDPower`.
   * 
   * With power saving on, the display will turn on if a button is pressed, the watch is turned face up, or the screen is updated (see `Bangle.setOptions` for configuration). It'll turn off automatically after the given timeout.
   * 
   * **Note:** This function also sets the Backlight and Lock timeout (the time at which the touchscreen/buttons start being ignored). To set both separately, use `Bangle.setOptions`
   * @param isOn The timeout of the display in seconds, or `0`/`undefined` to turn power saving off. Default is 10 seconds.
   */
  static setLCDTimeout(isOn: number): void

  /**
   * This function can be used to lock or unlock Bangle.js
   * (eg whether buttons and touchscreen work or not)
   * @param isLocked `true` if the Bangle is locked (no user input allowed)
   */
  static setLocked(isLocked: boolean): void

  /**
   * Set internal options used for gestures, etc...
   * 
   * * `wakeOnBTN1` should the LCD turn on when BTN1 is pressed? default = `true`
   * * `wakeOnBTN2` should the LCD turn on when BTN2 is pressed? default = `true`
   * * `wakeOnBTN3` should the LCD turn on when BTN3 is pressed? default = `true`
   * * `wakeOnFaceUp` should the LCD turn on when the watch is turned face up? default = `false`
   * * `wakeOnTouch` should the LCD turn on when the touchscreen is pressed? default = `false`
   * * `wakeOnTwist` should the LCD turn on when the watch is twisted? default = `true`
   * * `twistThreshold`  How much acceleration to register a twist of the watch strap? Can be negative for oppsite direction. default = `800`
   * * `twistMaxY` Maximum acceleration in Y to trigger a twist (low Y means watch is facing the right way up). default = `-800`
   * * `twistTimeout`  How little time (in ms) must a twist take from low->high acceleration? default = `1000`
   * * `gestureStartThresh` how big a difference before we consider a gesture started? default = `sqr(800)`
   * * `gestureEndThresh` how small a difference before we consider a gesture ended? default = `sqr(2000)`
   * * `gestureInactiveCount` how many samples do we keep after a gesture has ended? default = `4`
   * * `gestureMinLength` how many samples must a gesture have before we notify about it? default = `10`
   * * `powerSave` after a minute of not being moved, Bangle.js will change the accelerometer poll interval down to 800ms (10x accelerometer samples).
   *    On movement it'll be raised to the default 80ms. If `Bangle.setPollInterval` is used this is disabled, and for it to work the poll interval
   *    must be either 80ms or 800ms. default = `true`
   * * `lockTimeout` how many milliseconds before the screen locks
   * * `lcdPowerTimeout` how many milliseconds before the screen turns off
   * * `backlightTimeout` how many milliseconds before the screen's backlight turns off
   * * `hrmPollInterval` set the requested poll interval (in milliseconds) for the heart rate monitor. On Bangle.js 2 only 10,20,40,80,160,200 ms are supported, and polling rate may not be exact. The algorithm's filtering is tuned for 20-40ms poll intervals, so higher/lower intervals may effect the reliability of the BPM reading.
   * 
   * Where accelerations are used they are in internal units, where `8192 = 1g`
   * @param options 
   */
  static setOptions(options: any): void

  /**
   * Set how often the watch should poll for new acceleration/gyro data and kick the Watchdog timer. It isn't
   * recommended that you make this interval much larger than 1000ms, but values up to 4000ms are allowed.
   * 
   * Calling this will set `Bangle.setOptions({powerSave: false})` - disabling the dynamic adjustment of
   * poll interval to save battery power when Bangle.js is stationary.
   * @param interval Polling interval in milliseconds (Default is 80ms - 12.5Hz to match accelerometer)
   */
  static setPollInterval(interval: number): void

  /**
   * Sets the current value of the step counter
   * @param count The value with which to reload the step counter
   */
  static setStepCount(count: number): void

  /**
   * This puts Bangle.js into the specified UI input mode, and calls the callback provided when there is user input.
   * 
   * Currently supported interface types are:
   * 
   * * 'updown' - UI input with upwards motion `cb(-1)`, downwards motion `cb(1)`, and select `cb()`
   *   * Bangle.js 1 uses BTN1/3 for up/down and BTN2 for select
   *   * Bangle.js 2 uses touchscreen swipe up/down and tap
   * * 'leftright' - UI input with left motion `cb(-1)`, right motion `cb(1)`, and select `cb()`
   *   * Bangle.js 1 uses BTN1/3 for left/right and BTN2 for select
   *   * Bangle.js 2 uses touchscreen swipe left/right and tap/BTN1 for select
   * * 'clock' - called for clocks. Sets `Bangle.CLOCK=1` and allows a button to start the launcher
   *   * Bangle.js 1 BTN2 starts the launcher
   *   * Bangle.js 2 BTN1 starts the launcher
   * * 'clockupdown' - called for clocks. Sets `Bangle.CLOCK=1`, allows a button to start the launcher, but also provides up/down functionality
   *   * Bangle.js 1 BTN2 starts the launcher, BTN1/BTN3 call `cb(-1)` and `cb(1)`
   *   * Bangle.js 2 BTN1 starts the launcher, touchscreen tap in top/bottom right hand side calls `cb(-1)` and `cb(1)`
   * * `{mode:"custom", ...}` allows you to specify custom handlers for different interations. See below.
   * * `undefined` removes all user interaction code
   * 
   * While you could use setWatch/etc manually, the benefit here is that you don't end up with multiple `setWatch` instances, and
   * the actual input method (touch, or buttons) is implemented dependent on the watch (Bangle.js 1 or 2)
   * 
   * **Note:** You can override this function in boot code to change the interaction mode with the watch. For instance
   * you could make all clocks start the launcher with a swipe by using:
   * 
   * ```
   * (function() {
   *   var sui = Bangle.setUI;
   *   Bangle.setUI = function(mode, cb) {
   *     if (mode!="clock") return sui(mode,cb);
   *     sui(); // clear
   *     Bangle.CLOCK=1;
   *     Bangle.swipeHandler = Bangle.showLauncher;
   *     Bangle.on("swipe", Bangle.swipeHandler);
   *   };
   * })();
   * ```
   * 
   * The first argument can also be an object, in which case more options can be specified:
   * 
   * ```
   * Bangle.setUI({
   *   mode : "custom",
   *   back : function() {}, // optional - add a 'back' icon in top-left widget area and call this function when it is pressed
   *   touch : function(n,e) {}, // optional - handler for 'touch' events
   *   swipe : function(dir) {}, // optional - handler for 'swipe' events
   *   drag : function(e) {}, // optional - handler for 'drag' events (Bangle.js 2 only)
   *   btn : function(n) {}, // optional - handler for 'button' events (n==1 on Bangle.js 2, n==1/2/3 depending on button for Bangle.js 1)
   * });
   * ```
   * @param type The type of UI input: 'updown', 'leftright', 'clock', 'clockupdown' or undefined to cancel. Can also be an object (see below)
   * @param callback A function with one argument which is the direction
   */
  static setUI(type: any, callback: any): void

  /**
   */
  static setUI(): void

  /**
   * Load the Bangle.js app launcher, which will allow the user
   * to select an application to launch.
   */
  static showLauncher(): void

  /**
   * Turn Bangle.js (mostly) off, but keep the CPU in sleep
   * mode until BTN1 is pressed to preserve the RTC (current time).
   */
  static softOff(): void
}


class NRF {
  /**
   * Called with discovered characteristics when discovery is finished
   */
  on(event: 'characteristicsDiscover', callback: () => void): void

  /**
   * Called when a host device connects to Espruino. The first argument contains the address.
   * @param addr The address of the device that has connected
   */
  on(event: 'connect', callback: (addr: string) => void): void

  /**
   * Called when a host device disconnects from Espruino.
   * 
   * The most common reason is:
   * * 19 - `REMOTE_USER_TERMINATED_CONNECTION`
   * * 22 - `LOCAL_HOST_TERMINATED_CONNECTION`
   * @param reason The reason code reported back by the BLE stack - see Nordic's [`ble_hci.h` file](https://github.com/espruino/Espruino/blob/master/targetlibs/nrf5x_12/components/softdevice/s132/headers/ble_hci.h#L71) for more information
   */
  on(event: 'disconnect', callback: (reason: number) => void): void

  /**
   * Called with a single byte value when Espruino is set up as
   * a HID device and the computer it is connected to sends a
   * HID report back to Espruino. This is usually used for handling
   * indications such as the Caps Lock LED.
   */
  on(event: 'HID', callback: () => void): void

  /**
   * Called when an NFC field is no longer detected
   */
  on(event: 'NFCoff', callback: () => void): void

  /**
   * Called when an NFC field is detected
   */
  on(event: 'NFCon', callback: () => void): void

  /**
   * When NFC is started with `NRF.nfcStart`, this is fired
   * when NFC data is received. It doesn't get called if
   * NFC is started with `NRF.nfcURL` or `NRF.nfcRaw`
   * @param arr An ArrayBuffer containign the received data
   */
  on(event: 'NFCrx', callback: (arr: ArrayBuffer) => void): void

  /**
   * Contains updates on the security of the current Bluetooth link.
   * 
   * See Nordic's `ble_gap_evt_auth_status_t` structure for more information.
   * @param status An object containing `{auth_status,bonded,lv4,kdist_own,kdist_peer}
   */
  on(event: 'security', callback: (status: {auth_status:number, bonded:boolean,lv4:any, kdist_own:any,kdist_peer:any}) => void): void

  /**
   * Called with discovered services when discovery is finished
   */
  on(event: 'servicesDiscover', callback: () => void): void

  /**
   * Send an AMS command to an Apple Media Service device to control music playback
   * 
   * Command is one of play, pause, playpause, next, prev, volup, voldown, repeat, shuffle, skipforward, skipback, like, dislike, bookmark
   * @param id For example, 'play', 'pause', 'volup' or 'voldown'
   */
  static amsCommand(id: any): void

  /**
   * Get Apple Media Service (AMS) info for the current media player.
   * "playbackinfo" returns a concatenation of three comma-separated values:
   * 
   * - PlaybackState: a string that represents the integer value of the playback state:
   *     - PlaybackStatePaused = 0
   *     - PlaybackStatePlaying = 1
   *     - PlaybackStateRewinding = 2
   *     - PlaybackStateFastForwarding = 3
   * - PlaybackRate: a string that represents the floating point value of the playback rate.
   * - ElapsedTime: a string that represents the floating point value of the elapsed time of the current track, in seconds
   * @param id Either 'name', 'playbackinfo' or 'volume'
   */
  static amsGetPlayerInfo(id: any): Promise

  /**
   * Get Apple Media Service (AMS) info for the currently-playing track
   * @param id Either 'artist', 'album', 'title' or 'duration'
   */
  static amsGetTrackInfo(id: any): Promise

  /**
   * Check if Apple Media Service (AMS) is currently active on the BLE connection
   */
  static amsIsActive(): boolean

  /**
   * Send an ANCS action for a specific Notification UID. Corresponds to posaction/negaction in the 'ANCS' event that was received
   * @param uid The UID of the notification to respond to
   * @param positive `true` for positive action, `false` for negative
   */
  static ancsAction(uid: number, positive: boolean): void

  /**
   * Get ANCS info for an app (add id is available via `ancsGetNotificationInfo`)
   * 
   * Promise returns:
   * 
   * ```
   * {
   *   "uid" : int,
   *   "appId" : string,
   *   "title" : string,
   *   "subtitle" : string,
   *   "message" : string,
   *   "messageSize" : string,
   *   "date" : string,
   *   "posAction" : string,
   *   "negAction" : string,
   *   "name" : string,
   * }
   * ```
   * @param id The app ID to get information for
   */
  static ancsGetAppInfo(id: any): Promise

  /**
   * Get ANCS info for a notification, eg:
   * @param uid The UID of the notification to get information for
   */
  static ancsGetNotificationInfo(uid: number): Promise

  /**
   * Check if Apple Notification Center Service (ANCS) is currently active on the BLE connection
   */
  static ancsIsActive(): boolean

  /**
   * Connect to a BLE device by MAC address. Returns a promise,
   * the argument of which is the `BluetoothRemoteGATTServer` connection.
   * 
   * ```
   * NRF.connect("aa:bb:cc:dd:ee").then(function(server) {
   *   // ...
   * });
   * ```
   * 
   * This has the same effect as calling `BluetoothDevice.gatt.connect` on a `BluetoothDevice` requested
   * using `NRF.requestDevice`. It just allows you to specify the address directly (without having to scan).
   * 
   * You can use it as follows - this would connect to another Puck device and turn its LED on:
   * 
   * ```
   * var gatt;
   * NRF.connect("aa:bb:cc:dd:ee random").then(function(g) {
   *   gatt = g;
   *   return gatt.getPrimaryService("6e400001-b5a3-f393-e0a9-e50e24dcca9e");
   * }).then(function(service) {
   *   return service.getCharacteristic("6e400002-b5a3-f393-e0a9-e50e24dcca9e");
   * }).then(function(characteristic) {
   *   return characteristic.writeValue("LED1.set()\n");
   * }).then(function() {
   *   gatt.disconnect();
   *   console.log("Done!");
   * });
   * ```
   * 
   * **Note:** Espruino Bluetooth devices use a type of BLE address known as 'random static',
   * which is different to a 'public' address. To connect to an Espruino device you'll need
   * to use an address string of the form `"aa:bb:cc:dd:ee random"` rather than just
   * `"aa:bb:cc:dd:ee"`. If you scan for devices with `NRF.findDevices`/`NRF.setScan` then
   * addresses are already reported in the correct format.
   * @param mac The MAC address to connect to
   * @param options (Espruino-specific) An object of connection options (see `BluetoothRemoteGATTServer.connect` for full details)
   */
  static connect(mac: any, options: any): Promise

  /**
   * If a device is connected to Espruino, disconnect from it.
   */
  static disconnect(): void

  /**
   * This function can be used to quickly filter through Bluetooth devices.
   * 
   * For instance if you wish to scan for multiple different types of device at the same time
   * then you could use `NRF.findDevices` with all the filters you're interested in. When scanning
   * is finished you can then use `NRF.filterDevices` to pick out just the devices of interest.
   * 
   * ```
   * // the two types of device we're interested in
   * var filter1 = [{serviceData:{"fe95":{}}}];
   * var filter2 = [{namePrefix:"Pixl.js"}];
   * // the following filter will return both types of device
   * var allFilters = filter1.concat(filter2);
   * // now scan for both types of device, and filter them out afterwards
   * NRF.findDevices(function(devices) {
   *   var devices1 = NRF.filterDevices(devices, filter1);
   *   var devices2 = NRF.filterDevices(devices, filter2);
   *   // ...
   * }, {filters : allFilters});
   * ```
   * @param devices An array of `BluetoothDevice` objects, from `NRF.findDevices` or similar
   * @param filters A list of filters (as would be passed to `NRF.requestDevice`) to filter devices by
   */
  static filterDevices(devices: any, filters: any): any

  /**
   * Utility function to return a list of BLE devices detected in range. Behind the scenes,
   * this uses `NRF.setScan(...)` and collates the results.
   * 
   * ```
   * NRF.findDevices(function(devices) {
   *   console.log(devices);
   * }, 1000);
   * ```
   * 
   * prints something like:
   * 
   * ```
   * [
   *   BluetoothDevice {
   *     "id": "e7:e0:57:ad:36:a2 random",
   *     "rssi": -45,
   *     "services": [ "4567" ],
   *     "serviceData" : { "0123" : [ 1 ] },
   *     "manufacturerData" : [...],
   *     "data": new ArrayBuffer([ ... ]),
   *     "name": "Puck.js 36a2"
   *    },
   *   BluetoothDevice {
   *     "id": "c0:52:3f:50:42:c9 random",
   *     "rssi": -65,
   *     "data": new ArrayBuffer([ ... ]),
   *     "name": "Puck.js 8f57"
   *    }
   *  ]
   * ```
   * 
   * For more information on the structure returned, see `NRF.setScan`.
   * 
   * If you want to scan only for specific devices you can replace the timeout with an object
   * of the form `{filters: ..., timeout : ..., active: bool}` using the filters
   * described in `NRF.requestDevice`. For example to search for devices with Espruino's `manufacturerData`:
   * 
   * ```
   * NRF.findDevices(function(devices) {
   *   ...
   * }, {timeout : 2000, filters : [{ manufacturerData:{0x0590:{}} }] });
   * ```
   * 
   * You could then use [`BluetoothDevice.gatt.connect(...)`](/Reference#l_BluetoothRemoteGATTServer_connect) on
   * the device returned to make a connection.
   * 
   * You can also use [`NRF.connect(...)`](/Reference#l_NRF_connect) on just the `id` string returned, which
   * may be useful if you always want to connect to a specific device.
   * 
   * **Note:** Using findDevices turns the radio's receive mode on for 2000ms (or however long you specify). This
   * can draw a *lot* of power (12mA or so), so you should use it sparingly or you can run your battery down quickly.
   * 
   * **Note:** The 'data' field contains the data of *the last packet received*. There may have been more
   * packets. To get data for each packet individually use `NRF.setScan` instead.
   * @param callback The callback to call with received advertising packets (as `BluetoothDevice`), or undefined to stop
   * @param options A time in milliseconds to scan for (defaults to 2000), Or an optional object `{filters: ..., timeout : ..., active: bool}` (as would be passed to `NRF.requestDevice`) to filter devices by
   */
  static findDevices(callback: any, options: any): void

  /**
   * Get this device's default Bluetooth MAC address.
   * 
   * For Puck.js, the last 5 characters of this (eg. `ee:ff`)
   * are used in the device's advertised Bluetooth name.
   */
  static getAddress(): any

  /**
   */
  static getAddress(): any

  /**
   * This is just like `NRF.setAdvertising`, except instead of advertising
   * the data, it returns the packet that would be advertised as an array.
   * @param data The data to advertise as an object
   * @param options An optional object of options
   */
  static getAdvertisingData(data: any, options: any): any

  /**
   * Get the battery level in volts (the voltage that the NRF chip is running off of).
   * 
   * This is the battery level of the device itself - it has nothing to with any
   * device that might be connected.
   */
  static getBattery(): number

  /**
   * Return an object with information about the security
   * state of the current peripheral connection:
   * 
   * ```
   * {
   *   connected       // The connection is active (not disconnected).
   *   encrypted       // Communication on this link is encrypted.
   *   mitm_protected  // The encrypted communication is also protected against man-in-the-middle attacks.
   *   bonded          // The peer is bonded with us
   *   connected_addr  // If connected=true, the MAC address of the currently connected device
   * }
   * ```
   * 
   * If there is no active connection, `{connected:false}` will be returned.
   * 
   * See `NRF.setSecurity` for information about negotiating a secure connection.
   */
  static getSecurityStatus(): any

  /**
   */
  static getSecurityStatus(): any

  /**
   * Enables NFC with a record that will launch the given android app.
   * 
   * For example:
   * 
   * ```
   * NRF.nfcAndroidApp("no.nordicsemi.android.nrftoolbox")
   * ```
   * @param app The unique identifier of the given Android App
   */
  static nfcAndroidApp(app: any): void

  /**
   * Enables NFC and with an out of band 16 byte pairing key.
   * 
   * For example the following will enable out of band pairing on BLE
   * such that the device will pair when you tap the phone against it:
   * 
   * ```
   * var bleKey = [0xAA, 0xBB, 0xCC, 0xDD, 0xEE, 0xFF, 0x99, 0x88, 0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11, 0x00];
   * NRF.on('security',s=>print("security",JSON.stringify(s)));
   * NRF.nfcPair(bleKey);
   * NRF.setSecurity({oob:bleKey, mitm:true});
   * ```
   * @param key 16 byte out of band key
   */
  static nfcPair(key: any): void

  /**
   * Enables NFC and starts advertising with Raw data. For example:
   * 
   * ```
   * NRF.nfcRaw(new Uint8Array([193, 1, 0, 0, 0, 13, 85, 3, 101, 115, 112, 114, 117, 105, 110, 111, 46, 99, 111, 109]));
   * // same as NRF.nfcURL("http://espruino.com");
   * ```
   * @param payload The NFC NDEF message to deliver to the reader
   */
  static nfcRaw(payload: any): void

  /**
   * **Advanced NFC Functionality.** If you just want to advertise a URL, use `NRF.nfcURL` instead.
   * 
   * Acknowledges the last frame and optionally transmits a response.
   * If payload is an array, then a array.length byte nfc frame is sent.
   * If payload is a int, then a 4bit ACK/NACK is sent.
   * **Note:** ```nfcSend``` should always be called after an ```NFCrx``` event.
   * 
   * ```
   * NRF.nfcSend(new Uint8Array([0x01, 0x02, ...]));
   * // or
   * NRF.nfcSend(0x0A);
   * // or
   * NRF.nfcSend();
   * ```
   * @param payload Optional tx data
   */
  static nfcSend(payload: any): void

  /**
   * **Advanced NFC Functionality.** If you just want to advertise a URL, use `NRF.nfcURL` instead.
   * 
   * Enables NFC and starts advertising. `NFCrx` events will be
   * fired when data is received.
   * 
   * ```
   * NRF.nfcStart();
   * ```
   * @param payload Optional 7 byte UID
   */
  static nfcStart(payload: any): any

  /**
   * **Advanced NFC Functionality.** If you just want to advertise a URL, use `NRF.nfcURL` instead.
   * 
   * Disables NFC.
   * 
   * ```
   * NRF.nfcStop();
   * ```
   */
  static nfcStop(): void

  /**
   * Enables NFC and starts advertising the given URL. For example:
   * 
   * ```
   * NRF.nfcURL("http://espruino.com");
   * ```
   * @param url The URL string to expose on NFC, or `undefined` to disable NFC
   */
  static nfcURL(url: any): void

  /**
   * Search for available devices matching the given filters. Since we have no UI here,
   * Espruino will pick the FIRST device it finds, or it'll call `catch`.
   * 
   * `options` can have the following fields:
   * 
   * * `filters` - a list of filters that a device must match before it is returned (see below)
   * * `timeout` - the maximum time to scan for in milliseconds (scanning stops when a match
   * is found. eg. `NRF.requestDevice({ timeout:2000, filters: [ ... ] })`
   * * `active` - whether to perform active scanning (requesting 'scan response' packets from any
   * devices that are found). eg. `NRF.requestDevice({ active:true, filters: [ ... ] })`
   * 
   * **NOTE:** `timeout` and `active` are not part of the Web Bluetooth standard.
   * 
   * The following filter types are implemented:
   * 
   * * `services` - list of services as strings (all of which must match). 128 bit services must be in the form '01230123-0123-0123-0123-012301230123'
   * * `name` - exact device name
   * * `namePrefix` - starting characters of device name
   * * `id` - exact device address (`id:"e9:53:86:09:89:99 random"`) (this is Espruino-specific, and is not part of the Web Bluetooth spec)
   * * `serviceData` - an object containing service characteristics which must all match (`serviceData:{"1809":{}}`). Matching of actual service data is not supported yet.
   * * `manufacturerData` - an object containing manufacturer UUIDs which must all match (`manufacturerData:{0x0590:{}}`). Matching of actual manufacturer data is not supported yet.
   * 
   * ```
   * NRF.requestDevice({ filters: [{ namePrefix: 'Puck.js' }] }).then(function(device) { ... });
   * // or
   * NRF.requestDevice({ filters: [{ services: ['1823'] }] }).then(function(device) { ... });
   * // or
   * NRF.requestDevice({ filters: [{ manufacturerData:{0x0590:{}} }] }).then(function(device) { ... });
   * ```
   * 
   * As a full example, to send data to another Puck.js to turn an LED on:
   * 
   * ```
   * var gatt;
   * NRF.requestDevice({ filters: [{ namePrefix: 'Puck.js' }] }).then(function(device) {
   *   return device.gatt.connect();
   * }).then(function(g) {
   *   gatt = g;
   *   return gatt.getPrimaryService("6e400001-b5a3-f393-e0a9-e50e24dcca9e");
   * }).then(function(service) {
   *   return service.getCharacteristic("6e400002-b5a3-f393-e0a9-e50e24dcca9e");
   * }).then(function(characteristic) {
   *   return characteristic.writeValue("LED1.set()\n");
   * }).then(function() {
   *   gatt.disconnect();
   *   console.log("Done!");
   * });
   * ```
   * 
   * Or slightly more concisely, using ES6 arrow functions:
   * 
   * ```
   * var gatt;
   * NRF.requestDevice({ filters: [{ namePrefix: 'Puck.js' }]}).then(
   *   device => device.gatt.connect()).then(
   *   g => (gatt=g).getPrimaryService("6e400001-b5a3-f393-e0a9-e50e24dcca9e")).then(
   *   service => service.getCharacteristic("6e400002-b5a3-f393-e0a9-e50e24dcca9e")).then(
   *   characteristic => characteristic.writeValue("LED1.reset()\n")).then(
   *   () => { gatt.disconnect(); console.log("Done!"); } );
   * ```
   * 
   * Note that you have to keep track of the `gatt` variable so that you can
   * disconnect the Bluetooth connection when you're done.
   * 
   * **Note:** Using a filter in `NRF.requestDevice` filters each advertising packet individually. As
   * soon as a matching advertisement is received,  `NRF.requestDevice` resolves the promise and stops
   * scanning. This means that if you filter based on a service UUID and a device advertises with multiple packets
   * (or a scan response when `active:true`) only the packet matching the filter is returned - you may not
   * get the device's name is that was in a separate packet. To aggregate multiple packets you can use `NRF.findDevices`.
   * @param options Options used to filter the device to use
   */
  static requestDevice(options: any): Promise

  /**
   * Restart the Bluetooth softdevice (if there is currently a BLE connection,
   * it will queue a restart to be done when the connection closes).
   * 
   * You shouldn't need to call this function in normal usage. However, Nordic's
   * BLE softdevice has some settings that cannot be reset. For example there
   * are only a certain number of unique UUIDs. Once these are all used the
   * only option is to restart the softdevice to clear them all out.
   * @param callback An optional function to be called while the softdevice is uninitialised. Use with caution - accessing console/bluetooth will almost certainly result in a crash.
   */
  static restart(callback: any): void

  /**
   * Send a USB HID report. HID must first be enabled with `NRF.setServices({}, {hid: hid_report})`
   * @param data Input report data as an array
   * @param callback A callback function to be called when the data is sent
   */
  static sendHIDReport(data: any, callback: any): void

  /**
   * Set this device's default Bluetooth MAC address:
   * 
   * ```
   * NRF.setAddress("ff:ee:dd:cc:bb:aa random");
   * ```
   * 
   * Addresses take the form:
   * 
   * * `"ff:ee:dd:cc:bb:aa"` or `"ff:ee:dd:cc:bb:aa public"` for a public address
   * * `"ff:ee:dd:cc:bb:aa random"` for a random static address (the default for Espruino)
   * 
   * This may throw a `INVALID_BLE_ADDR` error if the upper two bits
   * of the address don't match the address type.
   * 
   * To change the address, Espruino must restart the softdevice. It will only do
   * so when it is disconnected from other devices.
   * @param addr The address to use (as a string)
   */
  static setAddress(addr: any): void

  /**
   * Change the data that Espruino advertises.
   * 
   * Data can be of the form `{ UUID : data_as_byte_array }`. The UUID should be
   * a [Bluetooth Service ID](https://developer.bluetooth.org/gatt/services/Pages/ServicesHome.aspx).
   * 
   * For example to return battery level at 95%, do:
   * 
   * ```
   * NRF.setAdvertising({
   *   0x180F : [95] // Service data 0x180F = 95
   * });
   * ```
   * 
   * Or you could report the current temperature:
   * 
   * ```
   * setInterval(function() {
   *   NRF.setAdvertising({
   *     0x1809 : [Math.round(E.getTemperature())]
   *   });
   * }, 30000);
   * ```
   * 
   * If you specify a value for the object key, Service Data is advertised. However
   * if you specify `undefined`, the Service UUID is advertised:
   * 
   * ```
   * NRF.setAdvertising({
   *   0x180D : undefined // Advertise service UUID 0x180D (HRM)
   * });
   * ```
   * 
   * Service UUIDs can also be supplied in the second argument of
   * `NRF.setServices`, but those go in the scan response packet.
   * 
   * You can also supply the raw advertising data in an array. For example
   * to advertise as an Eddystone beacon:
   * 
   * ```
   * NRF.setAdvertising([0x03,  // Length of Service List
   *   0x03,  // Param: Service List
   *   0xAA, 0xFE,  // Eddystone ID
   *   0x13,  // Length of Service Data
   *   0x16,  // Service Data
   *   0xAA, 0xFE, // Eddystone ID
   *   0x10,  // Frame type: URL
   *   0xF8, // Power
   *   0x03, // https://
   *   'g','o','o','.','g','l','/','B','3','J','0','O','c'],
   *     {interval:100});
   * ```
   * 
   * (However for Eddystone we'd advise that you use the [Espruino Eddystone library](/Puck.js+Eddystone))
   * 
   * **Note:** When specifying data as an array, certain advertising options such as
   * `discoverable` and `showName` won't have any effect.
   * 
   * **Note:** The size of Bluetooth LE advertising packets is limited to 31 bytes. If
   * you want to advertise more data, consider using an array for `data` (See below), or
   * `NRF.setScanResponse`.
   * 
   * You can even specify an array of arrays or objects, in which case each advertising packet
   * will be used in turn - for instance to make your device advertise battery level and its name
   * as well as both Eddystone and iBeacon :
   * 
   * ```
   * NRF.setAdvertising([
   *   {0x180F : [Puck.getBatteryPercentage()]}, // normal advertising, with battery %
   *   require("ble_ibeacon").get(...), // iBeacon
   *   require("ble_eddystone").get(...), // eddystone
   * ], {interval:300});
   * ```
   * 
   * `options` is an object, which can contain:
   * 
   * ```
   * {
   *   name: "Hello" // The name of the device
   *   showName: true/false // include full name, or nothing
   *   discoverable: true/false // general discoverable, or limited - default is limited
   *   connectable: true/false // whether device is connectable - default is true
   *   scannable : true/false // whether device can be scanned for scan response packets - default is true
   *   interval: 600 // Advertising interval in msec, between 20 and 10000 (default is 375ms)
   *   manufacturer: 0x0590 // IF sending manufacturer data, this is the manufacturer ID
   *   manufacturerData: [...] // IF sending manufacturer data, this is an array of data
   * }
   * ```
   * 
   * Setting `connectable` and `scannable` to false gives the lowest power consumption
   * as the BLE radio doesn't have to listen after sending advertising.
   * 
   * **NOTE:** Non-`connectable` advertising can't have an advertising interval less than 100ms
   * according to the BLE spec.
   * 
   * So for instance to set the name of Puck.js without advertising any
   * other data you can just use the command:
   * 
   * ```
   * NRF.setAdvertising({},{name:"Hello"});
   * ```
   * 
   * You can also specify 'manufacturer data', which is another form of advertising data.
   * We've registered the Manufacturer ID 0x0590 (as Pur3 Ltd) for use with *Official
   * Espruino devices* - use it to advertise whatever data you'd like, but we'd recommend
   * using JSON.
   * 
   * For example by not advertising a device name you can send up to 24 bytes of JSON on
   * Espruino's manufacturer ID:
   * 
   * ```
   * var data = {a:1,b:2};
   * NRF.setAdvertising({},{
   *   showName:false,
   *   manufacturer:0x0590,
   *   manufacturerData:JSON.stringify(data)
   * });
   * ```
   * 
   * If you're using [EspruinoHub](https://github.com/espruino/EspruinoHub) then it will
   * automatically decode this into the folling MQTT topics:
   * 
   * * `/ble/advertise/ma:c_:_a:dd:re:ss/espruino` -> `{"a":10,"b":15}`
   * * `/ble/advertise/ma:c_:_a:dd:re:ss/a` -> `1`
   * * `/ble/advertise/ma:c_:_a:dd:re:ss/b` -> `2`
   * 
   * Note that **you only have 24 characters available for JSON**, so try to use
   * the shortest field names possible and avoid floating point values that can
   * be very long when converted to a String.
   * @param data The service data to advertise as an object - see below for more info
   * @param options An optional object of options
   */
  static setAdvertising(data: any, options: any): void

  /**
   * @param data The data to advertise as an object - see below for more info
   * @param options An optional object of options
   */
  static setAdvertising(data: any, options: any): void

  /**
   * When connected, Bluetooth LE devices communicate at a set interval.
   * Lowering the interval (eg. more packets/second) means a lower delay when
   * sending data, higher bandwidth, but also more power consumption.
   * 
   * By default, when connected as a peripheral Espruino automatically adjusts the
   * connection interval. When connected it's as fast as possible (7.5ms) but when idle
   * for over a minute it drops to 200ms. On continued activity (>1 BLE operation) the
   * interval is raised to 7.5ms again.
   * 
   * The options for `interval` are:
   * 
   * * `undefined` / `"auto"` : (default) automatically adjust connection interval
   * * `100` : set min and max connection interval to the same number (between 7.5ms and 4000ms)
   * * `{minInterval:20, maxInterval:100}` : set min and max connection interval as a range
   * 
   * This configuration is not remembered during a `save()` - you will have to
   * re-set it via `onInit`.
   * 
   * **Note:** If connecting to another device (as Central), you can use
   * an extra argument to `NRF.connect` or `BluetoothRemoteGATTServer.connect`
   * to specify a connection interval.
   * 
   * **Note:** This overwrites any changes imposed by the deprecated `NRF.setLowPowerConnection`
   * @param interval The connection interval to use (see below)
   */
  static setConnectionInterval(interval: any): void

  /**
   * **THIS IS DEPRECATED** - please use `NRF.setConnectionInterval` for
   * peripheral and `NRF.connect(addr, options)`/`BluetoothRemoteGATTServer.connect(options)`
   * for central connections.
   * 
   * This sets the connection parameters - these affect the transfer speed and
   * power usage when the device is connected.
   * 
   * * When not low power, the connection interval is between 7.5 and 20ms
   * * When low power, the connection interval is between 500 and 1000ms
   * 
   * When low power connection is enabled, transfers of data over Bluetooth
   * will be very slow, however power usage while connected will be drastically
   * decreased.
   * 
   * This will only take effect after the connection is disconnected and
   * re-established.
   * @param lowPower Whether the connection is low power or not
   */
  static setLowPowerConnection(lowPower: boolean): void

  /**
   * Start/stop listening for RSSI values on the currently active connection
   * (where This device is a peripheral and is being connected to by a 'central' device)
   * 
   * ```
   * // Start scanning
   * NRF.setRSSIHandler(function(rssi) {
   *   console.log(rssi); // prints -85 (or similar)
   * });
   * // Stop Scanning
   * NRF.setRSSIHandler();
   * ```
   * 
   * RSSI is the 'Received Signal Strength Indication' in dBm
   * @param callback The callback to call with the RSSI value, or undefined to stop
   */
  static setRSSIHandler(callback: any): void

  /**
   * Start/stop listening for BLE advertising packets within range. Returns a
   * `BluetoothDevice` for each advertsing packet. **By default this is not an active scan, so
   * Scan Response advertising data is not included (see below)**
   * 
   * ```
   * // Start scanning
   * packets=10;
   * NRF.setScan(function(d) {
   *   packets--;
   *   if (packets<=0)
   *     NRF.setScan(); // stop scanning
   *   else
   *     console.log(d); // print packet info
   * });
   * ```
   * 
   * Each `BluetoothDevice` will look a bit like:
   * 
   * ```
   * BluetoothDevice {
   *   "id": "aa:bb:cc:dd:ee:ff", // address
   *   "rssi": -89,               // signal strength
   *   "services": [ "128bit-uuid", ... ],     // zero or more service UUIDs
   *   "data": new Uint8Array([ ... ]).buffer, // ArrayBuffer of returned data
   *   "serviceData" : { "0123" : [ 1 ] }, // if service data is in 'data', it's extracted here
   *   "manufacturer" : 0x1234, // if manufacturer data is in 'data', the 16 bit manufacturer ID is extracted here
   *   "manufacturerData" : [...], // if manufacturer data is in 'data', the data is extracted here
   *   "name": "DeviceName"       // the advertised device name
   *  }
   * ```
   * 
   * You can also supply a set of filters (as described in `NRF.requestDevice`) as a second argument, which will
   * allow you to filter the devices you get a callback for. This helps
   * to cut down on the time spent processing JavaScript code in areas with
   * a lot of Bluetooth advertisements. For example to find only devices
   * with the manufacturer data `0x0590` (Espruino's ID) you could do:
   * 
   * ```
   * NRF.setScan(function(d) {
   *   console.log(d.manufacturerData);
   * }, { filters: [{ manufacturerData:{0x0590:{}} }] });
   * ```
   * 
   * You can also specify `active:true` in the second argument to perform
   * active scanning (this requests scan response packets) from any
   * devices it finds.
   * 
   * **Note:** Using a filter in `setScan` filters each advertising packet individually. As
   * a result, if you filter based on a service UUID and a device advertises with multiple packets
   * (or a scan response when `active:true`) only the packets matching the filter are returned. To
   * aggregate multiple packets you can use `NRF.findDevices`.
   * 
   * **Note:** BLE advertising packets can arrive quickly - faster than you'll
   * be able to print them to the console. It's best only to print a few, or
   * to use a function like `NRF.findDevices(..)` which will collate a list
   * of available devices.
   * 
   * **Note:** Using setScan turns the radio's receive mode on constantly. This
   * can draw a *lot* of power (12mA or so), so you should use it sparingly or
   * you can run your battery down quickly.
   * @param callback The callback to call with received advertising packets, or undefined to stop
   * @param options An optional object `{filters: ...}` (as would be passed to `NRF.requestDevice`) to filter devices by
   */
  static setScan(callback: any, options: any): void

  /**
   * The raw scan response data should be supplied as an array. For example to return "Sample" for the device name:
   * 
   * ```
   * NRF.setScanResponse([0x07,  // Length of Data
   *   0x09,  // Param: Complete Local Name
   *   'S', 'a', 'm', 'p', 'l', 'e']);
   * ```
   * 
   * **Note:** `NRF.setServices(..., {advertise:[ ... ]})` writes advertised
   * services into the scan response - so you can't use both `advertise`
   * and `NRF.setServices` or one will overwrite the other.
   * @param data The data to for the scan response
   */
  static setScanResponse(data: any): void

  /**
   * Sets the security options used when connecting/pairing. This applies to both central
   * *and* peripheral mode.
   * 
   * ```
   * NRF.setSecurity({
   *   display : bool  // default false, can this device display a passkey
   *                   // - sent via the `BluetoothDevice.passkey` event
   *   keyboard : bool // default false, can this device enter a passkey
   *                   // - request sent via the `BluetoothDevice.passkeyRequest` event
   *   bond : bool // default true, Perform bonding
   *   mitm : bool // default false, Man In The Middle protection
   *   lesc : bool // default false, LE Secure Connections
   *   passkey : // default "", or a 6 digit passkey to use
   *   oob : [0..15] // if specified, Out Of Band pairing is enabled and
   *                 // the 16 byte pairing code supplied here is used
   *   encryptUart : bool // default false (unless oob or passkey specified)
   *                      // This sets the BLE UART service such that it
   *                      // is encrypted and can only be used from a bonded connection
   * });
   * ```
   * 
   * **NOTE:** Some combinations of arguments will cause an error. For example
   * supplying a passkey without `display:1` is not allowed. If `display:1` is set
   * you do not require a physical display, the user just needs to know
   * the passkey you supplied.
   * 
   * For instance, to require pairing and to specify a passkey, use:
   * 
   * ```
   * NRF.setSecurity({passkey:"123456", mitm:1, display:1});
   * ```
   * 
   * However, while most devices will request a passkey for pairing at
   * this point it is still possible for a device to connect without
   * requiring one (eg. using the 'NRF Connect' app).
   * 
   * 
   * To force a passkey you need to protect each characteristic
   * you define with `NRF.setSecurity`. For instance the following
   * code will *require* that the passkey `123456` is entered
   * before the characteristic `9d020002-bf5f-1d1a-b52a-fe52091d5b12`
   * can be read.
   * 
   * ```
   * NRF.setSecurity({passkey:"123456", mitm:1, display:1});
   * NRF.setServices({
   *   "9d020001-bf5f-1d1a-b52a-fe52091d5b12" : {
   *     "9d020002-bf5f-1d1a-b52a-fe52091d5b12" : {
   *       // readable always
   *       value : "Not Secret"
   *     },
   *     "9d020003-bf5f-1d1a-b52a-fe52091d5b12" : {
   *       // readable only once bonded
   *       value : "Secret",
   *       readable : true,
   *       security: {
   *         read: {
   *           mitm: true,
   *           encrypted: true
   *         }
   *       }
   *     },
   *     "9d020004-bf5f-1d1a-b52a-fe52091d5b12" : {
   *       // readable always
   *       // writable only once bonded
   *       value : "Readable",
   *       readable : true,
   *       writable : true,
   *       onWrite : function(evt) {
   *         console.log("Wrote ", evt.data);
   *       },
   *       security: {
   *         write: {
   *           mitm: true,
   *           encrypted: true
   *         }
   *       }
   *     }
   *   }
   * });
   * ```
   * 
   * **Note:** If `passkey` or `oob` is specified, the Nordic UART service (if enabled)
   * will automatically be set to require encryption, but otherwise it is open.
   * @param options An object containing security-related options (see below)
   */
  static setSecurity(options: any): void

  /**
   * Change the services and characteristics Espruino advertises.
   * 
   * If you want to **change** the value of a characteristic, you need
   * to use `NRF.updateServices()` instead
   * 
   * To expose some information on Characteristic `ABCD` on service `BCDE` you could do:
   * 
   * ```
   * NRF.setServices({
   *   0xBCDE : {
   *     0xABCD : {
   *       value : "Hello",
   *       readable : true
   *     }
   *   }
   * });
   * ```
   * 
   * Or to allow the 3 LEDs to be controlled by writing numbers 0 to 7 to a
   * characteristic, you can do the following. `evt.data` is an ArrayBuffer.
   * 
   * ```
   * NRF.setServices({
   *   0xBCDE : {
   *     0xABCD : {
   *       writable : true,
   *       onWrite : function(evt) {
   *         digitalWrite([LED3,LED2,LED1], evt.data[0]);
   *       }
   *     }
   *   }
   * });
   * ```
   * 
   * You can supply many different options:
   * 
   * ```
   * NRF.setServices({
   *   0xBCDE : {
   *     0xABCD : {
   *       value : "Hello", // optional
   *       maxLen : 5, // optional (otherwise is length of initial value)
   *       broadcast : false, // optional, default is false
   *       readable : true,   // optional, default is false
   *       writable : true,   // optional, default is false
   *       notify : true,   // optional, default is false
   *       indicate : true,   // optional, default is false
   *       description: "My Characteristic",  // optional, default is null,
   *       security: { // optional - see NRF.setSecurity
   *         read: { // optional
   *           encrypted: false, // optional, default is false
   *           mitm: false, // optional, default is false
   *           lesc: false, // optional, default is false
   *           signed: false // optional, default is false
   *         },
   *         write: { // optional
   *           encrypted: true, // optional, default is false
   *           mitm: false, // optional, default is false
   *           lesc: false, // optional, default is false
   *           signed: false // optional, default is false
   *         }
   *       },
   *       onWrite : function(evt) { // optional
   *         console.log("Got ", evt.data); // an ArrayBuffer
   *       }
   *     }
   *     // more characteristics allowed
   *   }
   *   // more services allowed
   * });
   * ```
   * 
   * **Note:** UUIDs can be integers between `0` and `0xFFFF`, strings of
   * the form `"ABCD"`, or strings of the form `"ABCDABCD-ABCD-ABCD-ABCD-ABCDABCDABCD"`
   * 
   * `options` can be of the form:
   * 
   * ```
   * NRF.setServices(undefined, {
   *   hid : new Uint8Array(...), // optional, default is undefined. Enable BLE HID support
   *   uart : true, // optional, default is true. Enable BLE UART support
   *   advertise: [ '180D' ] // optional, list of service UUIDs to advertise
   *   ancs : true, // optional, Bangle.js-only, enable Apple ANCS support for notifications
   *   ams : true // optional, Bangle.js-only, enable Apple AMS support for media control
   * });
   * ```
   * 
   * To enable BLE HID, you must set `hid` to an array which is the BLE report
   * descriptor. The easiest way to do this is to use the `ble_hid_controls`
   * or `ble_hid_keyboard` modules.
   * 
   * **Note:** Just creating a service doesn't mean that the service will
   * be advertised. It will only be available after a device connects. To
   * advertise, specify the UUIDs you wish to advertise in the `advertise`
   * field of the second `options` argument. For example this will create
   * and advertise a heart rate service:
   * 
   * ```
   * NRF.setServices({
   *   0x180D: { // heart_rate
   *     0x2A37: { // heart_rate_measurement
   *       notify: true,
   *       value : [0x06, heartrate],
   *     }
   *   }
   * }, { advertise: [ '180D' ] });
   * ```
   * 
   * You may specify 128 bit UUIDs to advertise, however you may get a `DATA_SIZE`
   * exception because there is insufficient space in the Bluetooth LE advertising
   * packet for the 128 bit UART UUID as well as the UUID you specified. In this
   * case you can add `uart:false` after the `advertise` element to disable the
   * UART, however you then be unable to connect to Puck.js's console via Bluetooth.
   * 
   * If you absolutely require two or more 128 bit UUIDs then you will have to
   * specify your own raw advertising data packets with `NRF.setAdvertising`
   * 
   * **Note:** The services on Espruino can only be modified when there is
   * no device connected to it as it requires a restart of the Bluetooth stack.
   * **iOS devices will 'cache' the list of services** so apps like
   * NRF Connect may incorrectly display the old services even after you
   * have modified them. To fix this, disable and re-enable Bluetooth on your
   * iOS device, or use an Android device to run NRF Connect.
   * 
   * **Note:** Not all combinations of security configuration values are valid, the valid combinations are: encrypted,
   * encrypted + mitm, lesc, signed, signed + mitm. See `NRF.setSecurity` for more information.
   * @param data The service (and characteristics) to advertise
   * @param options Optional object containing options
   */
  static setServices(data: any, options: any): void

  /**
   * @param data The service (and characteristics) to advertise
   * @param options Optional object containing options
   */
  static setServices(data: any, options: any): void

  /**
   * Set the BLE radio transmit power. The default TX power is 0 dBm, and
   * @param power Transmit power. Accepted values are -40(nRF52 only), -30(nRF51 only), -20, -16, -12, -8, -4, 0, and 4 dBm. On nRF52840 (eg Bangle.js 2) 5/6/7/8 dBm are available too. Others will give an error code.
   */
  static setTxPower(power: number): void

  /**
   * If set to true, whenever a device bonds it will be added to the
   * whitelist.
   * 
   * When set to false, the whitelist is cleared and newly bonded
   * devices will not be added to the whitelist.
   * 
   * **Note:** This is remembered between `reset()`s but isn't
   * remembered after power-on (you'll have to add it to `onInit()`.
   * @param whitelisting Are we using a whitelist? (default false)
   */
  static setWhitelist(whitelisting: boolean): void

  /**
   * Disable Bluetooth advertising and disconnect from any device that
   * connected to Puck.js as a peripheral (this won't affect any devices
   * that Puck.js initiated connections to).
   * 
   * This makes Puck.js undiscoverable, so it can't be connected to.
   * 
   * Use `NRF.wake()` to wake up and make Puck.js connectable again.
   */
  static sleep(): void

  /**
   * @param forceRepair True if we should force repairing even if there is already valid pairing info
   */
  static startBonding(forceRepair: boolean): any

  /**
   * Update values for the services and characteristics Espruino advertises.
   * Only services and characteristics previously declared using `NRF.setServices` are affected.
   * 
   * To update the '0xABCD' characteristic in the '0xBCDE' service:
   * 
   * ```
   * NRF.updateServices({
   *   0xBCDE : {
   *     0xABCD : {
   *       value : "World"
   *     }
   *   }
   * });
   * ```
   * 
   * You can also use 128 bit UUIDs, for example `"b7920001-3c1b-4b40-869f-3c0db9be80c6"`.
   * 
   * To define a service and characteristic and then notify connected clients of a
   * change to it when a button is pressed:
   * 
   * ```
   * NRF.setServices({
   *   0xBCDE : {
   *     0xABCD : {
   *       value : "Hello",
   *       maxLen : 20,
   *       notify: true
   *     }
   *   }
   * });
   * setWatch(function() {
   *   NRF.updateServices({
   *     0xBCDE : {
   *       0xABCD : {
   *         value : "World!",
   *         notify: true
   *       }
   *     }
   *   });
   * }, BTN, { repeat:true, edge:"rising", debounce: 50 });
   * ```
   * 
   * This only works if the characteristic was created with `notify: true` using `NRF.setServices`,
   * otherwise the characteristic will be updated but no notification will be sent.
   * 
   * Also note that `maxLen` was specified. If it wasn't then the maximum length of
   * the characteristic would have been 5 - the length of `"Hello"`.
   * 
   * To indicate (i.e. notify with ACK) connected clients of a change to the '0xABCD' characteristic in the '0xBCDE' service:
   * 
   * ```
   * NRF.updateServices({
   *   0xBCDE : {
   *     0xABCD : {
   *       value : "World",
   *       indicate: true
   *     }
   *   }
   * });
   * ```
   * 
   * This only works if the characteristic was created with `indicate: true` using `NRF.setServices`,
   * otherwise the characteristic will be updated but no notification will be sent.
   * 
   * **Note:** See `NRF.setServices` for more information
   * @param data The service (and characteristics) to update
   */
  static updateServices(data: any): void

  /**
   * Enable Bluetooth advertising (this is enabled by default), which
   * allows other devices to discover and connect to Puck.js.
   * 
   * Use `NRF.sleep()` to disable advertising.
   */
  static wake(): void
}

/**
 * A Web Bluetooth-style device - you can request one using `NRF.requestDevice(address)`
 * 
 * For example:
 * 
 * ```
 * var gatt;
 * NRF.requestDevice({ filters: [{ name: 'Puck.js abcd' }] }).then(function(device) {
 *   console.log("found device");
 *   return device.gatt.connect();
 * }).then(function(g) {
 *   gatt = g;
 *   console.log("connected");
 *   return gatt.startBonding();
 * }).then(function() {
 *   console.log("bonded", gatt.getSecurityStatus());
 *   gatt.disconnect();
 * }).catch(function(e) {
 *   console.log("ERROR",e);
 * });
 * ```
 */
class BluetoothDevice {
  /**
   */
  connected: boolean

  /**
   */
  gatt: any

  /**
   */
  rssi: boolean

  /**
   * Called when the device gets disconnected.
   * 
   * To connect and then print `Disconnected` when the device is
   * disconnected, just do the following:
   * 
   * ```
   * var gatt;
   * NRF.connect("aa:bb:cc:dd:ee:ff").then(function(gatt) {
   *   gatt.device.on('gattserverdisconnected', function(reason) {
   *     console.log("Disconnected ",reason);
   *   });
   * });
   * ```
   * 
   * Or:
   * 
   * ```
   * var gatt;
   * NRF.requestDevice(...).then(function(device) {
   *   device.on('gattserverdisconnected', function(reason) {
   *     console.log("Disconnected ",reason);
   *   });
   * });
   * ```
   * @param reason The reason code reported back by the BLE stack - see Nordic's `ble_hci.h` file for more information
   */
  on(event: 'gattserverdisconnected', callback: (reason: number) => void): void

  /**
   * Called when the device pairs and sends a passkey that Espruino should display.
   * 
   * For this to be used, you'll have to specify that there's a display using `NRF.setSecurity`
   * 
   * **This is not part of the Web Bluetooth Specification.** It has been added
   * specifically for Espruino.
   * @param passkey A 6 character numeric String to be displayed
   */
  on(event: 'passkey', callback: (passkey: string) => void): void

  /**
   * Called when the device pairs, displays a passkey, and wants Espruino to tell it what the passkey was.
   * 
   * Respond with `BluetoothDevice.sendPasskey()` with a 6 character string containing only `0..9`.
   * 
   * For this to be used, you'll have to specify that there's a keyboard using `NRF.setSecurity`
   * 
   * **This is not part of the Web Bluetooth Specification.** It has been added
   * specifically for Espruino.
   */
  on(event: 'passkeyRequest', callback: () => void): void

  /**
   * To be used as a response when the event `BluetoothDevice.sendPasskey` has been received.
   * 
   * **This is not part of the Web Bluetooth Specification.** It has been added
   * specifically for Espruino.
   * @param passkey A 6 character numeric String to be returned to the device
   */
  sendPasskey(passkey: any): void
}

/**
 * Web Bluetooth-style GATT server - get this using `NRF.connect(address)`
 * or `NRF.requestDevice(options)` and `response.gatt.connect`
 * 
 * https://webbluetoothcg.github.io/web-bluetooth/#bluetoothremotegattserver
 */
class BluetoothRemoteGATTServer {
  /**
   * Connect to a BLE device - returns a promise,
   * the argument of which is the `BluetoothRemoteGATTServer` connection.
   * 
   * See [`NRF.requestDevice`](/Reference#l_NRF_requestDevice) for usage examples.
   * 
   * `options` is an optional object containing:
   * 
   * ```
   * {
   *    minInterval // min connection interval in milliseconds, 7.5 ms to 4 s
   *    maxInterval // max connection interval in milliseconds, 7.5 ms to 4 s
   * }
   * ```
   * 
   * By default the interval is 20-200ms (or 500-1000ms if `NRF.setLowPowerConnection(true)` was called.
   * During connection Espruino negotiates with the other device to find a common interval that can be
   * used.
   * 
   * For instance calling:
   * 
   * ```
   * NRF.requestDevice({ filters: [{ namePrefix: 'Pixl.js' }] }).then(function(device) {
   *   return device.gatt.connect({minInterval:7.5, maxInterval:7.5});
   * }).then(function(g) {
   * ```
   * 
   * will force the connection to use the fastest connection interval possible (as long as the device
   * at the other end supports it).
   * 
   * **Note:** The Web Bluetooth spec states that if a device hasn't advertised its name, when connected
   * to a device the central (in this case Espruino) should automatically retrieve the name from the
   * corresponding characteristic (`0x2a00` on service `0x1800`). Espruino does not automatically do this.
   * @param options (Espruino-specific) An object of connection options (see below)
   */
  connect(options: any): Promise

  /**
   * Disconnect from a previously connected BLE device connected with
   * `BluetoothRemoteGATTServer.connect` - this does not disconnect from something that has
   * connected to the Espruino.
   * 
   * **Note:** While `.disconnect` is standard Web Bluetooth, in the spec it
   * returns undefined not a `Promise` for implementation reasons. In Espruino
   * we return a `Promise` to make it easier to detect when Espruino is free
   * to connect to something else.
   */
  disconnect(): Promise

  /**
   * See `NRF.connect` for usage examples.
   * @param service The service UUID
   */
  getPrimaryService(service: any): Promise

  /**
   */
  getPrimaryServices(): Promise

  /**
   * Return an object with information about the security
   * state of the current connection:
   * 
   * 
   * ```
   * {
   *   connected       // The connection is active (not disconnected).
   *   encrypted       // Communication on this link is encrypted.
   *   mitm_protected  // The encrypted communication is also protected against man-in-the-middle attacks.
   *   bonded          // The peer is bonded with us
   * }
   * ```
   * 
   * See `BluetoothRemoteGATTServer.startBonding` for information about
   * negotiating a secure connection.
   * 
   * **This is not part of the Web Bluetooth Specification.** It has been added
   * specifically for Puck.js.
   */
  getSecurityStatus(): any

  /**
   * Start/stop listening for RSSI values on the active GATT connection
   * 
   * ```
   * // Start listening for RSSI value updates
   * gattServer.setRSSIHandler(function(rssi) {
   *   console.log(rssi); // prints -85 (or similar)
   * });
   * // Stop listening
   * gattServer.setRSSIHandler();
   * ```
   * 
   * RSSI is the 'Received Signal Strength Indication' in dBm
   * @param callback The callback to call with the RSSI value, or undefined to stop
   */
  setRSSIHandler(callback: any): void

  /**
   * Start negotiating bonding (secure communications) with the connected device,
   * and return a Promise that is completed on success or failure.
   * 
   * ```
   * var gatt;
   * NRF.requestDevice({ filters: [{ name: 'Puck.js abcd' }] }).then(function(device) {
   *   console.log("found device");
   *   return device.gatt.connect();
   * }).then(function(g) {
   *   gatt = g;
   *   console.log("connected");
   *   return gatt.startBonding();
   * }).then(function() {
   *   console.log("bonded", gatt.getSecurityStatus());
   *   gatt.disconnect();
   * }).catch(function(e) {
   *   console.log("ERROR",e);
   * });
   * ```
   * 
   * **This is not part of the Web Bluetooth Specification.** It has been added
   * specifically for Espruino.
   * @param forceRePair If the device is already bonded, re-pair it
   */
  startBonding(forceRePair: boolean): Promise
}

/**
 * Web Bluetooth-style GATT service - get this using `BluetoothRemoteGATTServer.getPrimaryService(s)`
 * 
 * https://webbluetoothcg.github.io/web-bluetooth/#bluetoothremotegattservice
 */
class BluetoothRemoteGATTService {
  /**
   * See `NRF.connect` for usage examples.
   * @param characteristic The characteristic UUID
   */
  getCharacteristic(characteristic: any): Promise

  /**
   */
  getCharacteristics(): Promise
}

/**
 * Web Bluetooth-style GATT characteristic - get this using `BluetoothRemoteGATTService.getCharacteristic(s)`
 * 
 * https://webbluetoothcg.github.io/web-bluetooth/#bluetoothremotegattcharacteristic
 */
class BluetoothRemoteGATTCharacteristic {
  /**
   * Called when a characteristic's value changes, *after* `BluetoothRemoteGATTCharacteristic.startNotifications` has been called.
   * 
   * ```
   *   ...
   *   return service.getCharacteristic("characteristic_uuid");
   * }).then(function(c) {
   *   c.on('characteristicvaluechanged', function(event) {
   *     console.log("-> "+event.target.value);
   *   });
   *   return c.startNotifications();
   * }).then(...
   * ```
   * 
   * The first argument is of the form `{target : BluetoothRemoteGATTCharacteristic}`, and `BluetoothRemoteGATTCharacteristic.value`
   * will then contain the new value (as a DataView).
   */
  on(event: 'characteristicvaluechanged', callback: () => void): void

  /**
   * Read a characteristic's value, return a promise containing a `DataView`
   * 
   * ```
   * var device;
   * NRF.connect(device_address).then(function(d) {
   *   device = d;
   *   return d.getPrimaryService("service_uuid");
   * }).then(function(s) {
   *   console.log("Service ",s);
   *   return s.getCharacteristic("characteristic_uuid");
   * }).then(function(c) {
   *   return c.readValue();
   * }).then(function(d) {
   *   console.log("Got:", JSON.stringify(d.buffer));
   *   device.disconnect();
   * }).catch(function() {
   *   console.log("Something's broken.");
   * });
   * ```
   */
  readValue(): Promise

  /**
   * Starts notifications - whenever this characteristic's value changes, a `characteristicvaluechanged` event is fired
   * and `characteristic.value` will then contain the new value as a `DataView`.
   * 
   * ```
   * var device;
   * NRF.connect(device_address).then(function(d) {
   *   device = d;
   *   return d.getPrimaryService("service_uuid");
   * }).then(function(s) {
   *   console.log("Service ",s);
   *   return s.getCharacteristic("characteristic_uuid");
   * }).then(function(c) {
   *   c.on('characteristicvaluechanged', function(event) {
   *     console.log("-> ",event.target.value); // this is a DataView
   *   });
   *   return c.startNotifications();
   * }).then(function(d) {
   *   console.log("Waiting for notifications");
   * }).catch(function() {
   *   console.log("Something's broken.");
   * });
   * ```
   * 
   * For example, to listen to the output of another Puck.js's Nordic
   * Serial port service, you can use:
   * 
   * ```
   * var gatt;
   * NRF.connect("pu:ck:js:ad:dr:es random").then(function(g) {
   *   gatt = g;
   *   return gatt.getPrimaryService("6e400001-b5a3-f393-e0a9-e50e24dcca9e");
   * }).then(function(service) {
   *   return service.getCharacteristic("6e400003-b5a3-f393-e0a9-e50e24dcca9e");
   * }).then(function(characteristic) {
   *   characteristic.on('characteristicvaluechanged', function(event) {
   *     console.log("RX: "+JSON.stringify(event.target.value.buffer));
   *   });
   *   return characteristic.startNotifications();
   * }).then(function() {
   *   console.log("Done!");
   * });
   * ```
   */
  startNotifications(): Promise

  /**
   * Stop notifications (that were requested with `BluetoothRemoteGATTCharacteristic.startNotifications`)
   */
  stopNotifications(): Promise

  /**
   * Write a characteristic's value
   * 
   * ```
   * var device;
   * NRF.connect(device_address).then(function(d) {
   *   device = d;
   *   return d.getPrimaryService("service_uuid");
   * }).then(function(s) {
   *   console.log("Service ",s);
   *   return s.getCharacteristic("characteristic_uuid");
   * }).then(function(c) {
   *   return c.writeValue("Hello");
   * }).then(function(d) {
   *   device.disconnect();
   * }).catch(function() {
   *   console.log("Something's broken.");
   * });
   * ```
   * @param data The data to write
   */
  writeValue(data: any): Promise
}

/**
 * This is the File object - it allows you to stream data to and from files (As opposed to the `require('fs').readFile(..)` style functions that read an entire file).
 * 
 * To create a File object, you must type ```var fd = E.openFile('filepath','mode')``` - see [E.openFile](#l_E_openFile) for more information.
 * 
 * **Note:** If you want to remove an SD card after you have started using it, you *must* call `E.unmountSD()` or you may cause damage to the card.
 */
class File {
  /**
   * Close an open file.
   */
  close(): void

  /**
   * Pipe this file to a stream (an object with a 'write' method)
   * @param destination The destination file/stream that will receive content from the source.
   * @param options An optional object `{ chunkSize : int=32, end : bool=true, complete : function }`,chunkSize : The amount of data to pipe from source to destination at a time,complete : a function to call when the pipe activity is complete,end : call the 'end' function on the destination when the source is finished
   */
  pipe(destination: any, options: any): void

  /**
   * Read data in a file in byte size chunks
   * @param length is an integer specifying the number of bytes to read.
   */
  read(length: int32): any

  /**
   * Seek to a certain position in the file
   * @param nBytes is an integer specifying the number of bytes to skip forwards.
   */
  seek(nBytes: int32): void

  /**
   * Skip the specified number of bytes forward in the file
   * @param nBytes is a positive integer specifying the number of bytes to skip forwards.
   */
  skip(nBytes: int32): void

  /**
   * Write data to a file.
   * 
   * **Note:** By default this function flushes all changes to the
   * SD card, which makes it slow (but also safe!). You can use
   * `E.setFlags({unsyncFiles:1})` to disable this behaviour and
   * really speed up writes - but then you must be sure to close
   * all files you are writing before power is lost or you will
   * cause damage to your SD card's filesystem.
   * @param buffer A string containing the bytes to write
   */
  write(buffer: any): int32
}

/**
 * This class provides Graphics operations that can be applied to a surface.
 * 
 * Use Graphics.createXXX to create a graphics object that renders in the way you want. See [the Graphics page](https://www.espruino.com/Graphics) for more information.
 * 
 * **Note:** On boards that contain an LCD, there is a built-in 'LCD' object of type Graphics. For instance to draw a line you'd type: ```LCD.drawLine(0,0,100,100)```
 */
class Graphics {
  /**
   * On Graphics instances with an offscreen buffer, this
   * is an `ArrayBuffer` that provides access to the underlying
   * pixel data.
   * 
   * ```
   * g=Graphics.createArrayBuffer(8,8,8)
   * g.drawLine(0,0,7,7)
   * print(new Uint8Array(g.buffer))
   * new Uint8Array([
   * 255, 0, 0, 0, 0, 0, 0, 0,
   * 0, 255, 0, 0, 0, 0, 0, 0,
   * 0, 0, 255, 0, 0, 0, 0, 0,
   * 0, 0, 0, 255, 0, 0, 0, 0,
   * 0, 0, 0, 0, 255, 0, 0, 0,
   * 0, 0, 0, 0, 0, 255, 0, 0,
   * 0, 0, 0, 0, 0, 0, 255, 0,
   * 0, 0, 0, 0, 0, 0, 0, 255])
   * ```
   */
  buffer: void

  /**
   * Returns an object of the form:
   * 
   * ```
   * {
   *   fg : 0xFFFF,  // foreground colour
   *   bg : 0,       // background colour
   *   fg2 : 0xFFFF,  // accented foreground colour
   *   bg2 : 0x0007,  // accented background colour
   *   fgH : 0xFFFF,  // highlighted foreground colour
   *   bgH : 0x02F7,  // highlighted background colour
   *   dark : true,  // Is background dark (eg. foreground should be a light colour)
   * }
   * ```
   * 
   * These values can then be passed to `g.setColor`/`g.setBgColor` for example `g.setColor(g.theme.fg2)`. When the Graphics
   * instance is reset, the background color is automatically set to `g.theme.bg` and foreground is set to `g.theme.fg`.
   * 
   * On Bangle.js these values can be changed by writing updated values to `theme` in `settings.js` and reloading the app - or they can
   * be changed temporarily by calling `Graphics.setTheme`
   */
  theme: any

  /**
   * Create a Windows BMP file from this Graphics instance, and return it as a String.
   */
  asBMP(): any

  /**
   * Return this Graphics object as an Image that can be used with `Graphics.drawImage`.
   * Check out [the Graphics reference page](http://www.espruino.com/Graphics#images-bitmaps)
   * for more information on images.
   * 
   * Will return undefined if data can't be allocated for the image.
   * 
   * The image data itself will be referenced rather than copied if:
   * 
   * * An image `object` was requested (not `string`)
   * * The Graphics instance was created with `Graphics.createArrayBuffer`
   * * Is 8 bpp *OR* the `{msb:true}` option was given
   * * No other format options (zigzag/etc) were given
   * 
   * Otherwise data will be copied, which takes up more space and
   * may be quite slow.
   * @param type The type of image to return. Either `object`/undefined to return an image object, or `string` to return an image string
   */
  asImage(type: any): any

  /**
   * Create a URL of the form `data:image/bmp;base64,...` that can be pasted into the browser.
   * 
   * The Espruino Web IDE can detect this data on the console and render the image inline automatically.
   */
  asURL(): any

  /**
   * Blit one area of the screen (x1,y1 w,h) to another (x2,y2 w,h)
   * 
   * ```
   * g.blit({
   *   x1:0, y1:0,
   *   w:32, h:32,
   *   x2:100, y2:100,
   *   setModified : true // should we set the modified area?
   * });
   * ```
   * 
   * Note: This uses repeated pixel reads and writes, so will not work on platforms that
   * don't support pixel reads.
   * @param options options - see below
   */
  blit(options: any): Graphics

  /**
   * Clear the LCD with the Background Color
   * @param reset If `true`, resets the state of Graphics to the default (eg. Color, Font, etc) as if calling `Graphics.reset`
   */
  clear(reset: boolean): Graphics

  /**
   * Fill a rectangular area in the Background Color
   * 
   * On devices with enough memory, you can specify `{x,y,x2,y2,r}` as the first
   * argument, which allows you to draw a rounded rectangle.
   * @param x1 The left X coordinate OR an object containing `{x,y,x2,y2}` or `{x,y,w,h}`
   * @param y1 The top Y coordinate
   * @param x2 The right X coordinate
   * @param y2 The bottom Y coordinate
   */
  clearRect(x1: any, y1: int32, x2: int32, y2: int32): Graphics

  /**
   * Draw an unfilled circle 1px wide in the Foreground Color
   * @param x The X axis
   * @param y The Y axis
   * @param rad The circle radius
   */
  drawCircle(x: int32, y: int32, rad: int32): Graphics

  /**
   * Draw a circle, centred at (x,y) with radius r in the current foreground color
   * @param x Centre x-coordinate
   * @param y Centre y-coordinate
   * @param r Radius
   */
  drawCircleAA(x: int32, y: int32, r: int32): Graphics

  /**
   * Draw an ellipse in the Foreground Color
   * @param x1 The left X coordinate
   * @param y1 The top Y coordinate
   * @param x2 The right X coordinate
   * @param y2 The bottom Y coordinate
   */
  drawEllipse(x1: int32, y1: int32, x2: int32, y2: int32): Graphics

  /**
   * Image can be:
   * 
   * * An object with the following fields `{ width : int, height : int, bpp : optional int, buffer : ArrayBuffer/String, transparent: optional int, palette : optional Uint16Array(2/4/16) }`. bpp = bits per pixel (default is 1), transparent (if defined) is the colour that will be treated as transparent, and palette is a color palette that each pixel will be looked up in first
   * * A String where the the first few bytes are: `width,height,bpp,[transparent,]image_bytes...`. If a transparent colour is specified the top bit of `bpp` should be set.
   * * An ArrayBuffer Graphics object (if `bpp<8`, `msb:true` must be set) - this is disabled on devices without much flash memory available
   * 
   * Draw an image at the specified position.
   * 
   * * If the image is 1 bit, the graphics foreground/background colours will be used.
   * * If `img.palette` is a Uint16Array or 2/4/16 elements, color data will be looked from the supplied palette
   * * On Bangle.js, 2 bit images blend from background(0) to foreground(1) colours
   * * On Bangle.js, 4 bit images use the Apple Mac 16 color palette
   * * On Bangle.js, 8 bit images use the Web Safe 216 color palette
   * * Otherwise color data will be copied as-is. Bitmaps are rendered MSB-first
   * 
   * If `options` is supplied, `drawImage` will allow images to be rendered at any scale or angle. If `options.rotate` is set it will
   * center images at `x,y`. `options` must be an object of the form:
   * 
   * ```
   * {
   *   rotate : float, // the amount to rotate the image in radians (default 0)
   *   scale : float, // the amount to scale the image up (default 1)
   *   frame : int    // if specified and the image has frames of data
   *                  //  after the initial frame, draw one of those frames from the image
   * }
   * ```
   * 
   * For example:
   * 
   * ```
   * // In the top left of the screen
   * g.drawImage(img,0,0);
   * // In the top left of the screen, twice as big
   * g.drawImage(img,0,0,{scale:2});
   * // In the center of the screen, twice as big, 45 degrees
   * g.drawImage(img, g.getWidth()/2, g.getHeight()/2,
   *             {scale:2, rotate:Math.PI/4});
   * ```
   * @param image An image to draw, either a String or an Object (see below)
   * @param x The X offset to draw the image
   * @param y The Y offset to draw the image
   * @param options options for scaling,rotation,etc (see below)
   */
  drawImage(image: any, x: int32, y: int32, options: any): Graphics

  /**
   * Draws multiple images *at once* - which avoids flicker on unbuffered systems
   * like Bangle.js. Maximum layer count right now is 4.
   * 
   * ```
   * layers = [ {
   *   {x : int, // x start position
   *    y : int, // y start position
   *    image : string/object,
   *    scale : float, // scale factor, default 1
   *    rotate : float, // angle in radians
   *    center : bool // center on x,y? default is top left
   *    repeat : should this image be repeated (tiled?)
   *    nobounds : bool // if true, the bounds of the image are not used to work out the default area to draw
   *   }
   * ]
   * options = { // the area to render. Defaults to rendering just enough to cover what's requested
   *  x,y,
   *  width,height
   * }
   * ```
   * @param layers An array of objects {x,y,image,scale,rotate,center} (up to 3)
   * @param options options for rendering - see below
   */
  drawImages(layers: any, options: any): Graphics

  /**
   * Draw a line between x1,y1 and x2,y2 in the current foreground color
   * @param x1 The left
   * @param y1 The top
   * @param x2 The right
   * @param y2 The bottom
   */
  drawLine(x1: int32, y1: int32, x2: int32, y2: int32): Graphics

  /**
   * Draw a line between x1,y1 and x2,y2 in the current foreground color
   * @param x1 The left
   * @param y1 The top
   * @param x2 The right
   * @param y2 The bottom
   */
  drawLineAA(x1: number, y1: number, x2: number, y2: number): Graphics

  /**
   * Draw a polyline (lines between each of the points in `poly`) in the current foreground color
   * 
   * **Note:** there is a limit of 64 points (128 XY elements) for polygons
   * @param poly An array of vertices, of the form ```[x1,y1,x2,y2,x3,y3,etc]```
   * @param closed Draw another line between the last element of the array and the first
   */
  drawPoly(poly: any, closed: boolean): Graphics

  /**
   * Draw an **antialiased** polyline (lines between each of the points in `poly`) in the current foreground color
   * 
   * **Note:** there is a limit of 64 points (128 XY elements) for polygons
   * @param poly An array of vertices, of the form ```[x1,y1,x2,y2,x3,y3,etc]```
   * @param closed Draw another line between the last element of the array and the first
   */
  drawPolyAA(poly: any, closed: boolean): Graphics

  /**
   * Draw an unfilled rectangle 1px wide in the Foreground Color
   * @param x1 The left X coordinate OR an object containing `{x,y,x2,y2}` or `{x,y,w,h}`
   * @param y1 The top Y coordinate
   * @param x2 The right X coordinate
   * @param y2 The bottom Y coordinate
   */
  drawRect(x1: any, y1: int32, x2: int32, y2: int32): Graphics

  /**
   * Draw a string of text in the current font.
   * 
   * ```
   * g.drawString("Hello World", 10, 10);
   * ```
   * 
   * Images may also be embedded inside strings (eg to render Emoji or characters not in the current font).
   * To do this, just add `0` then the image string ([about Images](http://www.espruino.com/Graphics#images-bitmaps))
   * For example:
   * 
   * ```
   * g.drawString("Hi \0\7\5\1\x82 D\x17\xC0");
   * // draws:
   * // # #  #      #     #
   * // # #            #
   * // ### ##         #
   * // # #  #      #     #
   * // # # ###      #####
   * ```
   * @param str The string
   * @param x The X position of the leftmost pixel
   * @param y The Y position of the topmost pixel
   * @param solid For bitmap fonts, should empty pixels be filled with the background color?
   */
  drawString(str: any, x: int32, y: int32, solid: boolean): Graphics

  /**
   * Output this image as a bitmap URL of the form `data:image/bmp;base64,...`. The Espruino Web IDE will detect this on the console and will render the image inline automatically.
   * 
   * This is identical to `console.log(g.asURL())` - it is just a convenient function for easy debugging and producing screenshots of what is currently in the Graphics instance.
   * 
   * **Note:** This may not work on some bit depths of Graphics instances. It will also not work for the main Graphics instance
   * of Bangle.js 1 as the graphics on Bangle.js 1 are stored in write-only memory.
   */
  dump(): void

  /**
   * Draw a filled circle in the Foreground Color
   * @param x The X axis
   * @param y The Y axis
   * @param rad The circle radius
   */
  fillCircle(x: int32, y: int32, rad: int32): Graphics

  /**
   * Draw a filled ellipse in the Foreground Color
   * @param x1 The left X coordinate
   * @param y1 The top Y coordinate
   * @param x2 The right X coordinate
   * @param y2 The bottom Y coordinate
   */
  fillEllipse(x1: int32, y1: int32, x2: int32, y2: int32): Graphics

  /**
   * Draw a filled polygon in the current foreground color.
   * 
   * ```
   * g.fillPoly([
   *   16, 0,
   *   31, 31,
   *   26, 31,
   *   16, 12,
   *   6, 28,
   *   0, 27 ]);
   * ```
   * 
   * This fills from the top left hand side of the polygon (low X, low Y)
   * *down to but not including* the bottom right. When placed together polygons
   * will align perfectly without overdraw - but this will not fill the
   * same pixels as `drawPoly` (drawing a line around the edge of the polygon).
   * 
   * **Note:** there is a limit of 64 points (128 XY elements) for polygons
   * @param poly An array of vertices, of the form ```[x1,y1,x2,y2,x3,y3,etc]```
   */
  fillPoly(poly: any): Graphics

  /**
   * Draw a filled polygon in the current foreground color.
   * 
   * ```
   * g.fillPolyAA([
   *   16, 0,
   *   31, 31,
   *   26, 31,
   *   16, 12,
   *   6, 28,
   *   0, 27 ]);
   * ```
   * 
   * This fills from the top left hand side of the polygon (low X, low Y)
   * *down to but not including* the bottom right. When placed together polygons
   * will align perfectly without overdraw - but this will not fill the
   * same pixels as `drawPoly` (drawing a line around the edge of the polygon).
   * 
   * **Note:** there is a limit of 64 points (128 XY elements) for polygons
   * @param poly An array of vertices, of the form ```[x1,y1,x2,y2,x3,y3,etc]```
   */
  fillPolyAA(poly: any): Graphics

  /**
   * Fill a rectangular area in the Foreground Color
   * 
   * On devices with enough memory, you can specify `{x,y,x2,y2,r}` as the first
   * argument, which allows you to draw a rounded rectangle.
   * @param x1 The left X coordinate OR an object containing `{x,y,x2,y2}` or `{x,y,w,h}`
   * @param y1 The top Y coordinate
   * @param x2 The right X coordinate
   * @param y2 The bottom Y coordinate
   */
  fillRect(x1: any, y1: int32, x2: int32, y2: int32): Graphics

  /**
   * On instances of graphics that drive a display with
   * an offscreen buffer, calling this function will
   * copy the contents of the offscreen buffer to the
   * screen.
   * 
   * Call this when you have drawn something to Graphics
   * and you want it shown on the screen.
   * 
   * If a display does not have an offscreen buffer,
   * it may not have a `g.flip()` method.
   * 
   * On Bangle.js 1, there are different graphics modes
   * chosen with `Bangle.setLCDMode()`. The default mode
   * is unbuffered and in this mode `g.flip()` does not
   * affect the screen contents.
   * 
   * On some devices, this command will attempt to
   * only update the areas of the screen that have
   * changed in order to increase speed. If you have
   * accessed the `Graphics.buffer` directly then you
   * may need to use `Graphics.flip(true)` to force
   * a full update of the screen.
   * @param all (only on some devices) If `true` then copy all pixels, not just those that have changed.
   */
  flip(all: boolean): void

  /**
   * Get the background color to use for subsequent drawing operations
   */
  getBgColor(): number

  /**
   * The number of bits per pixel of this Graphics instance
   * 
   * **Note:** Bangle.js 2 behaves a little differently here. The display
   * is 3 bit, so `getBPP` returns 3 and `asBMP`/`asImage`/etc return 3 bit images.
   * However in order to allow dithering, the colors returned by `Graphics.getColor` and `Graphics.theme`
   * are actually 16 bits.
   */
  getBPP(): number

  /**
   * Get the color to use for subsequent drawing operations
   */
  getColor(): number

  /**
   * Get the font by name - can be saved and used with `Graphics.setFont`.
   * 
   * Normally this might return something like `"4x6"`, but if a scale
   * factor is specified, a colon and then the size is reported, like "4x6:2"
   * 
   * **Note:** For custom fonts, `Custom` is currently
   * reported instead of the font name.
   */
  getFont(): String

  /**
   * Return the height in pixels of the current font
   */
  getFontHeight(): number

  /**
   * Return an array of all fonts currently in the Graphics library.
   * 
   * **Note:** Vector fonts are specified as `Vector#` where `#` is the font height. As there
   * are effectively infinite fonts, just `Vector` is included in the list.
   */
  getFonts(): Array

  /**
   * The height of this Graphics instance
   */
  getHeight(): number

  /**
   * Return the area of the Graphics canvas that has been modified, and optionally clear
   * the modified area to 0.
   * 
   * For instance if `g.setPixel(10,20)` was called, this would return `{x1:10, y1:20, x2:10, y2:20}`
   * @param reset Whether to reset the modified area or not
   */
  getModified(reset: boolean): any

  /**
   * Get a pixel's color
   * @param x The left
   * @param y The top
   */
  getPixel(x: int32, y: int32): int32

  /**
   * The width of this Graphics instance
   */
  getWidth(): number

  /**
   * Return the width and height in pixels of an image (either Graphics, Image Object, Image String or ArrayBuffer). Returns
   * `undefined` if image couldn't be decoded.
   * 
   * `frames` is also included is the image contains more information than you'd expect for a single bitmap. In
   * this case the bitmap might be an animation with multiple frames
   * @param str The string
   */
  imageMetrics(str: any): any

  /**
   * Draw a line from the last position of lineTo or moveTo to this position
   * @param x X value
   * @param y Y value
   */
  lineTo(x: int32, y: int32): Graphics

  /**
   * Move the cursor to a position - see lineTo
   * @param x X value
   * @param y Y value
   */
  moveTo(x: int32, y: int32): Graphics

  /**
   * Calculate the square area under a Bezier curve.
   * 
   *  x0,y0: start point
   *  x1,y1: control point
   *  y2,y2: end point
   * 
   *  Max 10 points without start point.
   * @param arr An array of three vertices, six enties in form of ```[x0,y0,x1,y1,x2,y2]```
   * @param options number of points to calulate
   */
  quadraticBezier(arr: any, options: any): any

  /**
   * Reset the state of Graphics to the defaults (eg. Color, Font, etc)
   * that would have been used when Graphics was initialised.
   */
  reset(): Graphics

  /**
   * Scroll the contents of this graphics in a certain direction. The remaining area
   * is filled with the background color.
   * 
   * Note: This uses repeated pixel reads and writes, so will not work on platforms that
   * don't support pixel reads.
   * @param x X direction. >0 = to right
   * @param y Y direction. >0 = down
   */
  scroll(x: int32, y: int32): Graphics

  /**
   * Set the background color to use for subsequent drawing operations.
   * 
   * See `Graphics.setColor` for more information on the mapping of `r`, `g`, and `b` to pixel values.
   * 
   * **Note:** On devices with low flash memory, `r` **must** be an integer representing the color in the current bit depth. It cannot
   * be a floating point value, and `g` and `b` are ignored.
   * @param r Red (between 0 and 1) **OR** an integer representing the color in the current bit depth and color order **OR** a hexidecimal color string of the form `'#012345'`
   * @param g Green (between 0 and 1)
   * @param b Blue (between 0 and 1)
   */
  setBgColor(r: any, g: any, b: any): Graphics

  /**
   * This sets the 'clip rect' that subsequent drawing operations are clipped to
   * sit between.
   * 
   * These values are inclusive - eg `g.setClipRect(1,0,5,0)` will ensure that only
   * pixel rows 1,2,3,4,5 are touched on column 0.
   * 
   * **Note:** For maximum flexibility on Bangle.js 1, the values here are not range checked. For normal
   * use, X and Y should be between 0 and `getWidth()-1`/`getHeight()-1`.
   * 
   * **Note:** The x/y values here are rotated, so that if `Graphics.setRotation` is used
   * they correspond to the coordinates given to the draw functions, *not to the
   * physical device pixels*.
   * @param x1 Top left X coordinate
   * @param y1 Top left Y coordinate
   * @param x2 Bottom right X coordinate
   * @param y2 Bottom right Y coordinate
   */
  setClipRect(x1: number, y1: number, x2: number, y2: number): Graphics

  /**
   * Set the color to use for subsequent drawing operations.
   * 
   * If just `r` is specified as an integer, the numeric value will be written directly into a pixel. eg. On a 24 bit `Graphics` instance you set bright blue with either `g.setColor(0,0,1)` or `g.setColor(0x0000FF)`.
   * 
   * A good shortcut to ensure you get white on all platforms is to use `g.setColor(-1)`
   * 
   * The mapping is as follows:
   * 
   * * 32 bit: `r,g,b` => `0xFFrrggbb`
   * * 24 bit: `r,g,b` => `0xrrggbb`
   * * 16 bit: `r,g,b` => `0brrrrrggggggbbbbb` (RGB565)
   * * Other bpp: `r,g,b` => white if `r+g+b > 50%`, otherwise black (use `r` on its own as an integer)
   * 
   * If you specified `color_order` when creating the `Graphics` instance, `r`,`g` and `b` will be swapped as you specified.
   * 
   * **Note:** On devices with low flash memory, `r` **must** be an integer representing the color in the current bit depth. It cannot
   * be a floating point value, and `g` and `b` are ignored.
   * @param r Red (between 0 and 1) **OR** an integer representing the color in the current bit depth and color order **OR** a hexidecimal color string of the form `'#012345'`
   * @param g Green (between 0 and 1)
   * @param b Blue (between 0 and 1)
   */
  setColor(r: any, g: any, b: any): Graphics

  /**
   * Set the font by name. Various forms are available:
   * 
   * * `g.setFont("4x6")` - standard 4x6 bitmap font
   * * `g.setFont("Vector:12")` - vector font 12px high
   * * `g.setFont("4x6:2")` - 4x6 bitmap font, doubled in size
   * * `g.setFont("6x8:2x3")` - 6x8 bitmap font, doubled in width, tripled in height
   * 
   * You can also use these forms, but they are not recommended:
   * 
   * * `g.setFont("Vector12")` - vector font 12px high
   * * `g.setFont("4x6",2)` - 4x6 bitmap font, doubled in size
   * 
   * `g.getFont()` will return the current font as a String.
   * 
   * For a list of available font names, you can use `g.getFonts()`.
   * @param name The name of the font to use (if undefined, the standard 4x6 font will be used)
   * @param size The size of the font (or undefined)
   */
  setFont(name: any, size: number): Graphics

  /**
   * Set the current font
   * @param scale (optional) If >1 the font will be scaled up by that amount
   */
  setFont12x20(scale: number): Graphics

  /**
   * Set the current font
   * @param scale (optional) If >1 the font will be scaled up by that amount
   */
  setFont6x15(scale: number): Graphics

  /**
   * Set the alignment for subsequent calls to `drawString`
   * @param x X alignment. -1=left (default), 0=center, 1=right
   * @param y Y alignment. -1=top (default), 0=center, 1=bottom
   * @param rotation Rotation of the text. 0=normal, 1=90 degrees clockwise, 2=180, 3=270
   */
  setFontAlign(x: int32, y: int32, rotation: int32): Graphics

  /**
   * Make subsequent calls to `drawString` use the built-in 4x6 pixel bitmapped Font
   * 
   * It is recommended that you use `Graphics.setFont("4x6")` for more flexibility.
   */
  setFontBitmap(): Graphics

  /**
   * Make subsequent calls to `drawString` use a Custom Font of the given height. See the [Fonts page](http://www.espruino.com/Fonts) for more
   * information about custom fonts and how to create them.
   * 
   * For examples of use, see the [font modules](https://www.espruino.com/Fonts#font-modules).
   * 
   * **Note:** while you can specify the character code of the first character with `firstChar`,
   * the newline character 13 will always be treated as a newline and not rendered.
   * @param bitmap A column-first, MSB-first, 1bpp bitmap containing the font bitmap
   * @param firstChar The first character in the font - usually 32 (space)
   * @param width The width of each character in the font. Either an integer, or a string where each character represents the width
   * @param height The height as an integer (max 255). Bits 8-15 represent the scale factor (eg. `2<<8` is twice the size). Bits 16-23 represent the BPP (0,1=1 bpp, 2=2 bpp, 4=4 bpp)
   */
  setFontCustom(bitmap: any, firstChar: int32, width: any, height: int32): Graphics

  /**
   * Make subsequent calls to `drawString` use a Vector Font of the given height.
   * 
   * It is recommended that you use `Graphics.setFont("Vector", size)` for more flexibility.
   * @param size The height of the font, as an integer
   */
  setFontVector(size: int32): Graphics

  /**
   * Set a pixel's color
   * @param x The left
   * @param y The top
   * @param col The color (if `undefined`, the foreground color is useD)
   */
  setPixel(x: int32, y: int32, col: any): Graphics

  /**
   * Set the current rotation of the graphics device.
   * @param rotation The clockwise rotation. 0 for no rotation, 1 for 90 degrees, 2 for 180, 3 for 270
   * @param reflect Whether to reflect the image
   */
  setRotation(rotation: int32, reflect: boolean): Graphics

  /**
   * Set the global colour scheme. On Bangle.js, this is reloaded from `settings.json` for each new app loaded.
   * 
   * See `Graphics.theme` for the fields that can be provided. For instance you can change
   * the background to red using:
   * 
   * ```
   * g.setTheme({bg:"#f00"});
   * ```
   * @param theme An object of the form returned by `Graphics.theme`
   */
  setTheme(theme: any): Graphics

  /**
   * Return the width and height in pixels of a string of text in the current font
   * @param str The string
   */
  stringMetrics(str: any): any

  /**
   * Return the size in pixels of a string of text in the current font
   * @param str The string
   */
  stringWidth(str: any): number

  /**
   * Work out the color value to be used in the current bit depth based on the arguments.
   * 
   * This is used internally by setColor and setBgColor
   * 
   * ```
   * // 1 bit
   * g.toColor(1,1,1) => 1
   * // 16 bit
   * g.toColor(1,0,0) => 0xF800
   * ```
   * @param r Red (between 0 and 1) **OR** an integer representing the color in the current bit depth and color order **OR** a hexidecimal color string of the form `'#rrggbb' or `'#rgb'`
   * @param g Green (between 0 and 1)
   * @param b Blue (between 0 and 1)
   */
  toColor(r: any, g: any, b: any): number

  /**
   * Transformation can be:
   * 
   * * An object of the form
   * ```
   * {
   *   x: float, // x offset (default 0)
   *   y: float, // y offset (default 0)
   *   scale: float, // scale factor (default 1)
   *   rotate: float, // angle in radians (default 0)
   * }
   * ```
   * * A six-element array of the form `[a,b,c,d,e,f]`, which represents the 2D transformation matrix
   * ```
   * a c e
   * b d f
   * 0 0 1
   * ```
   * 
   *  Apply a transformation to an array of vertices.
   * @param verts An array of vertices, of the form ```[x1,y1,x2,y2,x3,y3,etc]```
   * @param transformation The transformation to apply, either an Object or an Array (see below)
   */
  transformVertices(verts: any, transformation: any): any

  /**
   * Wrap a string to the given pixel width using the current font, and return the
   * lines as an array.
   * 
   * To render within the screen's width you can do:
   * 
   * ```
   * g.drawString(g.wrapString(text, g.getWidth()).join("\n")),
   * ```
   * @param str The string
   * @param maxWidth The width in pixels
   */
  wrapString(str: any, maxWidth: number): any

  /**
   * Create a Graphics object that renders to an Array Buffer. This will have a field called 'buffer' that can get used to get at the buffer itself
   * @param width Pixels wide
   * @param height Pixels high
   * @param bpp Number of bits per pixel
   * @param options An object of other options. `{ zigzag : true/false(default), vertical_byte : true/false(default), msb : true/false(default), color_order: 'rgb'(default),'bgr',etc }`,`zigzag` = whether to alternate the direction of scanlines for rows,`vertical_byte` = whether to align bits in a byte vertically or not,`msb` = when bits<8, store pixels most significant bit first, when bits>8, store most significant byte first,`interleavex` = Pixels 0,2,4,etc are from the top half of the image, 1,3,5,etc from the bottom half. Used for P3 LED panels.,`color_order` = re-orders the colour values that are supplied via setColor
   */
  static createArrayBuffer(width: int32, height: int32, bpp: int32, options: any): Graphics

  /**
   * Create a Graphics object that renders by calling a JavaScript callback function to draw pixels
   * @param width Pixels wide
   * @param height Pixels high
   * @param bpp Number of bits per pixel
   * @param callback A function of the form ```function(x,y,col)``` that is called whenever a pixel needs to be drawn, or an object with: ```{setPixel:function(x,y,col),fillRect:function(x1,y1,x2,y2,col)}```. All arguments are already bounds checked.
   */
  static createCallback(width: int32, height: int32, bpp: int32, callback: any): Graphics

  /**
   * Create a simple Black and White image for use with `Graphics.drawImage`.
   * 
   * Use as follows:
   * 
   * ```
   * var img = Graphics.createImage(`
   * XXXXXXXXX
   * X       X
   * X   X   X
   * X   X   X
   * X       X
   * XXXXXXXXX
   * `);
   * g.drawImage(img, x,y);
   * ```
   * 
   * If the characters at the beginning and end of the string are newlines, they
   * will be ignored. Spaces are treated as `0`, and any other character is a `1`
   * @param str A String containing a newline-separated image - space is 0, anything else is 1
   */
  static createImage(str: any): any

  /**
   * Create a Graphics object that renders to SDL window (Linux-based devices only)
   * @param width Pixels wide
   * @param height Pixels high
   * @param bpp Bits per pixel (8,16,24 or 32 supported)
   */
  static createSDL(width: int32, height: int32, bpp: int32): Graphics

  /**
   * On devices like Pixl.js or HYSTM boards that contain a built-in display
   * this will return an instance of the graphics class that can be used to
   * access that display.
   * 
   * Internally, this is stored as a member called `gfx` inside the 'hiddenRoot'.
   */
  static getInstance(): any
}

/**
 * Class containing utility functions for accessing IO on the hexagonal badge
 */
class Badge {
  /**
   * Capacitive sense - the higher the capacitance, the higher the number returned.
   * 
   * Supply a corner number between 1 and 6, and an integer value will be returned that is proportional to the capacitance
   * @param corner The corner to use
   */
  static capSense(corner: number): number

  /**
   * Return an approximate battery percentage remaining based on
   * a normal CR2032 battery (2.8 - 2.2v)
   */
  static getBatteryPercentage(): number

  /**
   * Set the LCD's contrast
   * @param c Contrast between 0 and 1
   */
  static setContrast(c: number): void
}

/**
 * This is a standard JavaScript class that contains useful Maths routines
 */
class Math {
  /**
   */
  static E: number

  /**
   */
  static LN10: number

  /**
   */
  static LN2: number

  /**
   */
  static LOG10E: number

  /**
   */
  static LOG2E: number

  /**
   */
  static PI: number

  /**
   */
  static SQRT1_2: number

  /**
   */
  static SQRT2: number

  /**
   * @param x A floating point value
   */
  static abs(x: number): number

  /**
   * @param x The value to get the arc cosine of
   */
  static acos(x: number): number

  /**
   * @param x The value to get the arc sine of
   */
  static asin(x: number): number

  /**
   * @param x The value to get the arc tangent  of
   */
  static atan(x: number): number

  /**
   * @param y The Y-part of the angle to get the arc tangent of
   * @param x The X-part of the angle to get the arc tangent of
   */
  static atan2(y: number, x: number): number

  /**
   * @param x The value to round up
   */
  static ceil(x: number): number

  /**
   * DEPRECATED - Please use `E.clip()` instead. Clip a number to be between min and max (inclusive)
   * @param x A floating point value to clip
   * @param min The smallest the value should be
   * @param max The largest the value should be
   */
  static clip(x: number, min: number, max: number): number

  /**
   * @param theta The angle to get the cosine of
   */
  static cos(theta: number): number

  /**
   * @param x The value raise E to the power of
   */
  static exp(x: number): number

  /**
   * @param x The value to round down
   */
  static floor(x: number): number

  /**
   * @param x The value to take the logarithm (base E) root of
   */
  static log(x: number): number

  /**
   * Find the maximum of a series of numbers
   * @param args Floating point values to clip
   */
  static max(args: JsVarArray): number

  /**
   * Find the minimum of a series of numbers
   * @param args Floating point values to clip
   */
  static min(args: JsVarArray): number

  /**
   * @param x The value to raise to the power
   * @param y The power x should be raised to
   */
  static pow(x: number, y: number): number

  /**
   */
  static random(): number

  /**
   * @param x The value to round
   */
  static round(x: number): any

  /**
   * @param theta The angle to get the sine of
   */
  static sin(theta: number): number

  /**
   * @param x The value to take the square root of
   */
  static sqrt(x: number): number

  /**
   * @param theta The angle to get the tangent of
   */
  static tan(theta: number): number

  /**
   * DEPRECATED - This is not part of standard JavaScript libraries
   * 
   * Wrap a number around if it is less than 0 or greater than or equal to max. For instance you might do: ```Math.wrap(angleInDegrees, 360)```
   * @param x A floating point value to wrap
   * @param max The largest the value should be
   */
  static wrap(x: number, max: number): number
}

/**
 * Class containing [micro:bit's](https://www.espruino.com/MicroBit) utility functions.
 */
class Microbit {
  /**
   * The micro:bit's microphone pin
   * 
   * `MIC_ENABLE` should be set to 1 before using this
   */
  static MIC: Pin

  /**
   * The micro:bit's microphone enable pin
   */
  static MIC_ENABLE: Pin

  /**
   * The micro:bit's speaker pin
   */
  static SPEAKER: Pin

  /**
   * Called when the Micro:bit is moved in a deliberate fashion, and includes data on the detected gesture.
   * @param gesture An Int8Array containing the accelerations (X,Y,Z) from the last gesture detected by the accelerometer
   */
  on(event: 'gesture', callback: (gesture: Int8Array) => void): void

  /**
   */
  static accel(): any

  /**
   * Turn off events from  the accelerometer (started with `Microbit.accelOn`)
   */
  static accelOff(): void

  /**
   * Turn on the accelerometer, and create `Microbit.accel` and `Microbit.gesture` events.
   * 
   * **Note:** The accelerometer is currently always enabled - this code
   * just responds to interrupts and reads
   */
  static accelOn(): void

  /**
   * **Note:** This function is only available on the [BBC micro:bit](/MicroBit) board
   * 
   * Write the given value to the accelerometer
   * @param addr Accelerometer address
   * @param data Data to write
   */
  static accelWr(addr: number, data: number): void

  /**
   */
  static mag(): any

  /**
   * Play a waveform on the Micro:bit's speaker
   * @param waveform An array of data to play (unsigned 8 bit)
   * @param samplesPerSecond The number of samples per second for playback default is 4000
   * @param callback A function to call when playback is finished
   */
  static play(waveform: any, samplesPerSecond: any, callback: any): void

  /**
   * Records sound from the micro:bit's onboard microphone and returns the result
   * @param samplesPerSecond The number of samples per second for recording - 4000 is recommended
   * @param callback A function to call with the result of recording (unsigned 8 bit ArrayBuffer)
   * @param samples [optional] How many samples to record (6000 default)
   */
  static record(samplesPerSecond: any, callback: any, samples: any): void
}


class Bluetooth {
  /**
   */
  static setConsole(): void
}

/**
 * An instantiation of a WiFi network adaptor
 */
class WLAN {
  /**
   * Connect to a wireless network
   * @param ap Access point name
   * @param key WPA2 key (or undefined for unsecured connection)
   * @param callback Function to call back with connection status. It has one argument which is one of 'connect'/'disconnect'/'dhcp'
   */
  connect(ap: any, key: any, callback: any): boolean

  /**
   * Completely uninitialise and power down the CC3000. After this you'll have to use ```require("CC3000").connect()``` again.
   */
  disconnect(): void

  /**
   * Get the current IP address
   */
  getIP(): any

  /**
   * Completely uninitialise and power down the CC3000, then reconnect to the old access point.
   */
  reconnect(): void

  /**
   * Set the current IP address for get an IP from DHCP (if no options object is specified).
   * 
   * **Note:** Changes are written to non-volatile memory, but will only take effect after calling `wlan.reconnect()`
   * @param options Object containing IP address options `{ ip : '1,2,3,4', subnet, gateway, dns  }`, or do not supply an object in otder to force DHCP.
   */
  setIP(options: any): boolean
}

/**
 * This class helps to convert URLs into Objects of information ready for http.request/get
 */
class url {
  /**
   * A utility function to split a URL into parts
   * 
   * This is useful in web servers for instance when handling a request.
   * 
   * For instance `url.parse("/a?b=c&d=e",true)` returns `{"method":"GET","host":"","path":"/a?b=c&d=e","pathname":"/a","search":"?b=c&d=e","port":80,"query":{"b":"c","d":"e"}}`
   * @param urlStr A URL to be parsed
   * @param parseQuery Whether to parse the query string into an object not (default = false)
   */
  static parse(urlStr: any, parseQuery: boolean): any
}

/**
 * An instantiation of an Ethernet network adaptor
 */
class Ethernet {
  /**
   * Returns the hostname
   * @param callback An optional `callback(err,hostname)` function to be called back with the status information.
   */
  getHostname(callback: any): any

  /**
   * Get the current IP address, subnet, gateway and mac address.
   * @param options An optional `callback(err, ipinfo)` function to be called back with the IP information.
   */
  getIP(options: any): any

  /**
   * Get the current status of the ethernet device
   * @param options An optional `callback(err, status)` function to be called back with the status information.
   */
  getStatus(options: any): any

  /**
   * Set hostname allow to set the hosname used during the dhcp request.
   * min 8 and max 12 char, best set before calling `eth.setIP()`
   * Default is WIZnet010203, 010203 is the default nic as part of the mac.
   * Best to set the hosname before calling setIP().
   * @param hostname hostname as string
   * @param callback An optional `callback(err)` function to be called back with null or error text.
   */
  setHostname(hostname: any, callback: any): boolean

  /**
   * Set the current IP address or get an IP from DHCP (if no options object is specified)
   * 
   * If 'mac' is specified as an option, it must be a string of the form `"00:01:02:03:04:05"`
   * The default mac is 00:08:DC:01:02:03.
   * @param options Object containing IP address options `{ ip : '1.2.3.4', subnet : '...', gateway: '...', dns:'...', mac:':::::'  }`, or do not supply an object in order to force DHCP.
   * @param callback An optional `callback(err)` function to invoke when ip is set. `err==null` on success, or a string on failure.
   */
  setIP(options: any, callback: any): boolean
}

/**
 * Class containing utility functions for [Pixl.js](http://www.espruino.com/Pixl.js)
 */
class Pixl {
  /**
   * DEPRECATED - Please use `E.getBattery()` instead.
   * 
   * Return an approximate battery percentage remaining based on
   * a normal CR2032 battery (2.8 - 2.2v)
   */
  static getBatteryPercentage(): number

  /**
   * Writes a command directly to the ST7567 LCD controller
   * @param c 
   */
  static lcdw(c: number): void

  /**
   * Display a menu on Pixl.js's screen, and set up the buttons to navigate through it.
   * 
   * DEPRECATED: Use `E.showMenu`
   * @param menu An object containing name->function mappings to to be used in a menu
   */
  static menu(menu: any): any

  /**
   * Set the LCD's contrast
   * @param c Contrast between 0 and 1
   */
  static setContrast(c: number): void

  /**
   * This function can be used to turn Pixl.js's LCD off or on.
   * 
   * * With the LCD off, Pixl.js draws around 0.1mA
   * * With the LCD on, Pixl.js draws around 0.25mA
   * @param isOn True if the LCD should be on, false if not
   */
  static setLCDPower(isOn: boolean): void
}

/**
 * Class containing [Puck.js's](http://www.puck-js.com) utility functions.
 */
class Puck {
  /**
   * Only on Puck.js v2.0
   * 
   * Called after `Puck.accelOn()` every time accelerometer data
   * is sampled. There is one argument which is an object
   * of the form `{acc:{x,y,z}, gyro:{x,y,z}}` containing the data.
   * 
   * The data is as it comes off the accelerometer and is not
   * scaled to 1g. For more information see `Puck.accel()` or
   * [the Puck.js page on the magnetometer](http://www.espruino.com/Puck.js#on-board-peripherals).
   */
  on(event: 'accel', callback: (data:{acc:{x:number,y:number,z:number}, gyro:{x:number,y:number,z:number}}) => void): void

  /**
   * Called after `Puck.magOn()` every time magnetometer data
   * is sampled. There is one argument which is an object
   * of the form `{x,y,z}` containing magnetometer readings
   * as integers (for more information see `Puck.mag()`).
   * 
   * Check out [the Puck.js page on the magnetometer](http://www.espruino.com/Puck.js#on-board-peripherals)
   * for more information.
   */
  on(event: 'mag', callback: (mag:{x:number,y:number,z:number}) => void): void

  /**
   * Turn on the accelerometer, take a single reading, and then turn it off again.
   * 
   * The values reported are the raw values from the chip. In normal configuration:
   * 
   * * accelerometer: full-scale (32768) is 4g, so you need to divide by 8192 to get correctly scaled values
   * * gyro: full-scale (32768) is 245 dps, so you need to divide by 134 to get correctly scaled values
   * 
   * If taking more than one reading, we'd suggest you use `Puck.accelOn()` and the `Puck.accel` event.
   */
  static accel(): any

  /**
   * Turn the accelerometer off after it has been turned on by `Puck.accelOn()`.
   * 
   * Check out [the Puck.js page on the accelerometer](http://www.espruino.com/Puck.js#on-board-peripherals)
   * for more information.
   */
  static accelOff(): void

  /**
   * Accepted values are:
   * 
   * * 1.6 Hz (no Gyro) - 40uA (2v05 and later firmware)
   * * 12.5 Hz (with Gyro)- 350uA
   * * 26 Hz (with Gyro) - 450 uA
   * * 52 Hz (with Gyro) - 600 uA
   * * 104 Hz (with Gyro) - 900 uA
   * * 208 Hz (with Gyro) - 1500 uA
   * * 416 Hz (with Gyro) (not recommended)
   * * 833 Hz (with Gyro) (not recommended)
   * * 1660 Hz (with Gyro) (not recommended)
   * 
   * Once `Puck.accelOn()` is called, the `Puck.accel` event will be called each time data is received. `Puck.accelOff()` can be called to turn the accelerometer off.
   * 
   * For instance to light the red LED whenever Puck.js is face up:
   * 
   * ```
   * Puck.on('accel', function(a) {
   *  digitalWrite(LED1, a.acc.z > 0);
   * });
   * Puck.accelOn();
   * ```
   * 
   * Check out [the Puck.js page on the accelerometer](http://www.espruino.com/Puck.js#on-board-peripherals)
   * for more information.
   * @param samplerate The sample rate in Hz, or undefined
   */
  static accelOn(samplerate: number): void

  /**
   * Reads a register from the LSM6DS3TR-C Accelerometer. Can be used for configuring advanced functions.
   * 
   * Check out [the Puck.js page on the accelerometer](http://www.espruino.com/Puck.js#on-board-peripherals)
   * for more information and links to modules that use this function.
   * @param reg 
   */
  static accelRd(reg: number): number

  /**
   * Writes a register on the LSM6DS3TR-C Accelerometer. Can be used for configuring advanced functions.
   * 
   * Check out [the Puck.js page on the accelerometer](http://www.espruino.com/Puck.js#on-board-peripherals)
   * for more information and links to modules that use this function.
   * @param reg 
   * @param data 
   */
  static accelWr(reg: number, data: number): void

  /**
   * Capacitive sense - the higher the capacitance, the higher the number returned.
   * 
   * If called without arguments, a value depending on the capacitance of what is
   * attached to pin D11 will be returned. If you attach a length of wire to D11,
   * you'll be able to see a higher value returned when your hand is near the wire
   * than when it is away.
   * 
   * You can also supply pins to use yourself, however if you do this then
   * the TX pin must be connected to RX pin and sense plate via a roughly 1MOhm
   * resistor.
   * 
   * When not supplying pins, Puck.js uses an internal resistor between D12(tx)
   * and D11(rx).
   * @param tx 
   * @param rx 
   */
  static capSense(tx: Pin, rx: Pin): number

  /**
   * DEPRECATED - Please use `E.getBattery()` instead.
   * 
   * Return an approximate battery percentage remaining based on
   * a normal CR2032 battery (2.8 - 2.2v).
   */
  static getBatteryPercentage(): number

  /**
   * On Puck.js v2.0 this will use the on-board PCT2075TP temperature sensor, but on Puck.js the less accurate on-chip Temperature sensor is used.
   */
  static getTemperature(): number

  /**
   * Transmit the given set of IR pulses - data should be an array of pulse times
   * in milliseconds (as `[on, off, on, off, on, etc]`).
   * 
   * For example `Puck.IR(pulseTimes)` - see http://www.espruino.com/Puck.js+Infrared
   * for a full example.
   * 
   * You can also attach an external LED to Puck.js, in which case
   * you can just execute `Puck.IR(pulseTimes, led_cathode, led_anode)`
   * 
   * It is also possible to just supply a single pin for IR transmission
   * with `Puck.IR(pulseTimes, led_anode)` (on 2v05 and above).
   * @param data An array of pulse lengths, in milliseconds
   * @param cathode (optional) pin to use for IR LED cathode - if not defined, the built-in IR LED is used
   * @param anode (optional) pin to use for IR LED anode - if not defined, the built-in IR LED is used
   */
  static IR(data: any, cathode: Pin, anode: Pin): void

  /**
   * Return a light value based on the light the red LED is seeing.
   * 
   * **Note:** If called more than 5 times per second, the received light value
   * may not be accurate.
   */
  static light(): number

  /**
   * Turn on the magnetometer, take a single reading, and then turn it off again.
   * 
   * An object of the form `{x,y,z}` is returned containing magnetometer readings.
   * Due to residual magnetism in the Puck and magnetometer itself, with
   * no magnetic field the Puck will not return `{x:0,y:0,z:0}`.
   * 
   * Instead, it's up to you to figure out what the 'zero value' is for your
   * Puck in your location and to then subtract that from the value returned. If
   * you're not trying to measure the Earth's magnetic field then it's a good idea
   * to just take a reading at startup and use that.
   * 
   * With the aerial at the top of the board, the `y` reading is vertical, `x` is
   * horizontal, and `z` is through the board.
   * 
   * Readings are in increments of 0.1 micro Tesla (uT). The Earth's magnetic field
   * varies from around 25-60 uT, so the reading will vary by 250 to 600 depending
   * on location.
   */
  static mag(): any

  /**
   * Turn the magnetometer off
   */
  static magOff(): void

  /**
   * Turn the magnetometer on and start periodic sampling. Samples will then cause
   * a 'mag' event on 'Puck':
   * 
   * ```
   * Puck.magOn();
   * Puck.on('mag', function(xyz) {
   *   console.log(xyz);
   *   // {x:..., y:..., z:...}
   * });
   * // Turn events off with Puck.magOff();
   * ```
   * 
   * This call will be ignored if the sampling is already on.
   * 
   * If given an argument, the sample rate is set (if not, it's at 0.63 Hz).
   * The sample rate must be one of the following (resulting in the given power consumption):
   * 
   * * 80 Hz - 900uA
   * * 40 Hz - 550uA
   * * 20 Hz - 275uA
   * * 10 Hz - 137uA
   * * 5 Hz - 69uA
   * * 2.5 Hz - 34uA
   * * 1.25 Hz - 17uA
   * * 0.63 Hz - 8uA
   * * 0.31 Hz - 8uA
   * * 0.16 Hz - 8uA
   * * 0.08 Hz - 8uA
   * 
   * When the battery level drops too low while sampling is turned on,
   * the magnetometer may stop sampling without warning, even while other
   * Puck functions continue uninterrupted.
   * 
   * Check out [the Puck.js page on the magnetometer](http://www.espruino.com/Puck.js#on-board-peripherals)
   * for more information.
   * @param samplerate The sample rate in Hz, or undefined
   */
  static magOn(samplerate: number): void

  /**
   * Reads a register from the LIS3MDL / MAX3110 Magnetometer. Can be used for configuring advanced functions.
   * 
   * Check out [the Puck.js page on the magnetometer](http://www.espruino.com/Puck.js#on-board-peripherals)
   * for more information and links to modules that use this function.
   * @param reg 
   */
  static magRd(reg: number): number

  /**
   * Turn on the magnetometer, take a single temperature reading from the MAG3110 chip, and then turn it off again.
   * 
   * (If the magnetometer is already on, this just returns the last reading obtained)
   * 
   * `E.getTemperature()` uses the microcontroller's temperature sensor, but this uses the magnetometer's.
   * 
   * The reading obtained is an integer (so no decimal places), but the sensitivity is factory trimmed. to 1&deg;C, however the temperature
   * offset isn't - so absolute readings may still need calibrating.
   */
  static magTemp(): number

  /**
   * Writes a register on the LIS3MDL / MAX3110 Magnetometer. Can be used for configuring advanced functions.
   * 
   * Check out [the Puck.js page on the magnetometer](http://www.espruino.com/Puck.js#on-board-peripherals)
   * for more information and links to modules that use this function.
   * @param reg 
   * @param data 
   */
  static magWr(reg: number, data: number): void

  /**
   * Run a self-test, and return true for a pass. This checks for shorts
   * between pins, so your Puck shouldn't have anything connected to it.
   * 
   * **Note:** This self-test auto starts if you hold the button on your Puck
   * down while inserting the battery, leave it pressed for 3 seconds (while
   * the green LED is lit) and release it soon after all LEDs turn on. 5
   * red blinks is a fail, 5 green is a pass.
   * 
   * If the self test fails, it'll set the Puck.js Bluetooth advertising name
   * to `Puck.js !ERR` where ERR is a 3 letter error code.
   */
  static selfTest(): boolean
}

/**
 * This class exists in order to interface Espruino with fast-moving trigger wheels. Trigger wheels are physical discs with evenly spaced teeth cut into them, and often with one or two teeth next to each other missing. A sensor sends a signal whenever a tooth passed by, and this allows a device to measure not only RPM, but absolute position.
 * 
 * This class is currently in testing - it is NOT AVAILABLE on normal boards.
 */
class Trig {
  /**
   * Get the current error flags from the trigger wheel - and zero them
   */
  static getErrorArray(): any

  /**
   * Get the current error flags from the trigger wheel - and zero them
   */
  static getErrors(): number

  /**
   * Get the position of the trigger wheel at the given time (from getTime)
   * @param time The time at which to find the position
   */
  static getPosAtTime(time: number): number

  /**
   * Get the RPM of the trigger wheel
   */
  static getRPM(): number

  /**
   * Get the current state of a trigger
   * @param num The trigger number (0..7)
   */
  static getTrigger(num: number): any

  /**
   * Disable a trigger
   * @param num The trigger number (0..7)
   */
  static killTrigger(num: number): void

  /**
   * Set a trigger for a certain point in the cycle
   * @param num The trigger number (0..7)
   * @param pos The position (in degrees) to fire the trigger at
   * @param pins An array of pins to pulse (max 4)
   * @param pulseLength The time (in msec) to pulse for
   */
  static setTrigger(num: number, pos: number, pins: any, pulseLength: number): void

  /**
   * Initialise the trigger class
   * @param pin The pin to use for triggering
   * @param options Additional options as an object. defaults are: ```{teethTotal:60,teethMissing:2,minRPM:30,keyPosition:0}```
   */
  static setup(pin: Pin, options: any): void
}

/**
 * Class containing utility functions for the Seeed WIO LTE board
 */
class WioLTE {
  /**
   */
  static A4: any

  /**
   */
  static A6: any

  /**
   */
  static D20: any

  /**
   */
  static D38: any

  /**
   */
  static I2C: any

  /**
   */
  static UART: any

  /**
   * Set the WIO's LED
   * @param red 0-255, red LED intensity
   * @param green 0-255, green LED intensity
   * @param blue 0-255, blue LED intensity
   */
  static LED(red: number, green: number, blue: number): void

  /**
   * Set the power of Grove connectors, except for `D38` and `D39` which are always on.
   * @param onoff Whether to turn the Grove connectors power on or off (D38/D39 are always powered)
   */
  static setGrovePower(onoff: boolean): void

  /**
   * Turn power to the WIO's LED on or off.
   * 
   * Turning the LED on won't immediately display a color - that must be done with `WioLTE.LED(r,g,b)`
   * @param onoff true = on, false = off
   */
  static setLEDPower(onoff: boolean): void
}

/**
 * This is the built-in JavaScript class for arrays.
 * 
 * Arrays can be defined with ```[]```, ```new Array()```, or ```new Array(length)```
 */
class Array {
  /**
   * Find the length of the array
   */
  length: any

  /**
   * Create an Array. Either give it one integer argument (>=0) which is the length of the array, or any number of arguments
   * @param args The length of the array OR any number of items to add to the array
   */
  constructor(args: JsVarArray)

  /**
   * Create a new array, containing the elements from this one and any arguments, if any argument is an array then those elements will be added.
   * @param args Any items to add to the array
   */
  concat(args: JsVarArray): any

  /**
   * Return 'true' if the callback returns 'true' for every element in the array
   * @param function Function to be executed
   * @param thisArg if specified, the function is called with 'this' set to thisArg (optional)
   */
  every(function: any, thisArg: any): any

  /**
   * Fill this array with the given value, for every index `>= start` and `< end`
   * @param value The value to fill the array with
   * @param start Optional. The index to start from (or 0). If start is negative, it is treated as length+start where length is the length of the array
   * @param end Optional. The index to end at (or the array length). If end is negative, it is treated as length+end.
   */
  fill(value: any, start: number, end: any): any

  /**
   * Return an array which contains only those elements for which the callback function returns 'true'
   * @param function Function to be executed
   * @param thisArg if specified, the function is called with 'this' set to thisArg (optional)
   */
  filter(function: any, thisArg: any): any

  /**
   * Return the array element where `function` returns `true`, or `undefined` if it doesn't returns `true` for any element.
   * 
   * ```
   * ["Hello","There","World"].find(a=>a[0]=="T")
   * // returns "There"
   * ```
   * @param function Function to be executed
   */
  find(function: any): any

  /**
   * Return the array element's index where `function` returns `true`, or `-1` if it doesn't returns `true` for any element.
   * 
   * ```
   * ["Hello","There","World"].findIndex(a=>a[0]=="T")
   * // returns 1
   * ```
   * @param function Function to be executed
   */
  findIndex(function: any): any

  /**
   * Executes a provided function once per array element.
   * @param function Function to be executed
   * @param thisArg if specified, the function is called with 'this' set to thisArg (optional)
   */
  forEach(function: any, thisArg: any): void

  /**
   * Return `true` if the array includes the value, `false` otherwise
   * @param value The value to check for
   * @param startIndex (optional) the index to search from, or 0 if not specified
   */
  includes(value: any, startIndex: number): boolean

  /**
   * Return the index of the value in the array, or -1
   * @param value The value to check for
   * @param startIndex (optional) the index to search from, or 0 if not specified
   */
  indexOf(value: any, startIndex: number): any

  /**
   * Join all elements of this array together into one string, using 'separator' between them. eg. ```[1,2,3].join(' ')=='1 2 3'```
   * @param separator The separator
   */
  join(separator: any): any

  /**
   * Return an array which is made from the following: ```A.map(function) = [function(A[0]), function(A[1]), ...]```
   * @param function Function used to map one item to another
   * @param thisArg if specified, the function is called with 'this' set to thisArg (optional)
   */
  map(function: any, thisArg: any): any

  /**
   * Remove and return the value on the end of this array.
   * 
   * This is the opposite of `[1,2,3].shift()`, which removes an element from the beginning of the array.
   */
  pop(): any

  /**
   * Push a new value onto the end of this array'
   * 
   * This is the opposite of `[1,2,3].unshift(0)`, which adds one or more elements to the beginning of the array.
   * @param arguments One or more arguments to add
   */
  push(arguments: JsVarArray): number

  /**
   * Execute `previousValue=initialValue` and then `previousValue = callback(previousValue, currentValue, index, array)` for each element in the array, and finally return previousValue.
   * @param callback Function used to reduce the array
   * @param initialValue if specified, the initial value to pass to the function
   */
  reduce(callback: any, initialValue: any): any

  /**
   * Reverse all elements in this array (in place)
   */
  reverse(): any

  /**
   * Remove and return the first element of the array.
   * 
   * This is the opposite of `[1,2,3].pop()`, which takes an element off the end.
   */
  shift(): any

  /**
   * Return a copy of a portion of this array (in a new array)
   * @param start Start index
   * @param end End index (optional)
   */
  slice(start: number, end: any): any

  /**
   * Return 'true' if the callback returns 'true' for any of the elements in the array
   * @param function Function to be executed
   * @param thisArg if specified, the function is called with 'this' set to thisArg (optional)
   */
  some(function: any, thisArg: any): any

  /**
   * Do an in-place quicksort of the array
   * @param var A function to use to compare array elements (or undefined)
   */
  sort(var: any): any

  /**
   * Both remove and add items to an array
   * @param index Index at which to start changing the array. If negative, will begin that many elements from the end
   * @param howMany An integer indicating the number of old array elements to remove. If howMany is 0, no elements are removed.
   * @param elements One or more items to add to the array
   */
  splice(index: number, howMany: any, elements: JsVarArray): any

  /**
   * Convert the Array to a string
   * @param radix unused
   */
  toString(radix: any): any

  /**
   * Add one or more items to the start of the array, and return its new length.
   * 
   * This is the opposite of `[1,2,3].push(4)`, which puts one or more elements on the end.
   * @param elements One or more items to add to the beginning of the array
   */
  unshift(elements: JsVarArray): number

  /**
   * Returns true if the provided object is an array
   * @param var The variable to be tested
   */
  static isArray(var: any): boolean
}

/**
 * This is the built-in JavaScript class for array buffers.
 * 
 * If you want to access arrays of differing types of data
 * you may also find `DataView` useful.
 */
class ArrayBuffer {
  /**
   * The length, in bytes, of the `ArrayBuffer`
   */
  byteLength: number

  /**
   * Create an Array Buffer object
   * @param byteLength The length in Bytes
   */
  constructor(byteLength: number)
}

/**
 * This is the built-in JavaScript class that is the prototype for:
 * 
 * * [Uint8Array](/Reference#Uint8Array)
 * * [UintClamped8Array](/Reference#UintClamped8Array)
 * * [Int8Array](/Reference#Int8Array)
 * * [Uint16Array](/Reference#Uint16Array)
 * * [Int16Array](/Reference#Int16Array)
 * * [Uint24Array](/Reference#Uint24Array) (Espruino-specific - not standard JS)
 * * [Uint32Array](/Reference#Uint32Array)
 * * [Int32Array](/Reference#Int32Array)
 * * [Float32Array](/Reference#Float32Array)
 * * [Float64Array](/Reference#Float64Array)
 * 
 * If you want to access arrays of differing types of data
 * you may also find `DataView` useful.
 */
class ArrayBufferView {
  /**
   * The buffer this view references
   */
  buffer: any

  /**
   * The length, in bytes, of the `ArrayBufferView`
   */
  byteLength: number

  /**
   * The offset, in bytes, to the first byte of the view within the backing `ArrayBuffer`
   */
  byteOffset: number

  /**
   * Fill this array with the given value, for every index `>= start` and `< end`
   * @param value The value to fill the array with
   * @param start Optional. The index to start from (or 0). If start is negative, it is treated as length+start where length is the length of the array
   * @param end Optional. The index to end at (or the array length). If end is negative, it is treated as length+end.
   */
  fill(value: any, start: number, end: any): ArrayBufferView

  /**
   * Return an array which contains only those elements for which the callback function returns 'true'
   * @param function Function to be executed
   * @param thisArg if specified, the function is called with 'this' set to thisArg (optional)
   */
  filter(function: any, thisArg: any): any

  /**
   * Return the array element where `function` returns `true`, or `undefined` if it doesn't returns `true` for any element.
   * @param function Function to be executed
   */
  find(function: any): any

  /**
   * Return the array element's index where `function` returns `true`, or `-1` if it doesn't returns `true` for any element.
   * @param function Function to be executed
   */
  findIndex(function: any): any

  /**
   * Executes a provided function once per array element.
   * @param function Function to be executed
   * @param thisArg if specified, the function is called with 'this' set to thisArg (optional)
   */
  forEach(function: any, thisArg: any): void

  /**
   * Return `true` if the array includes the value, `false` otherwise
   * @param value The value to check for
   * @param startIndex (optional) the index to search from, or 0 if not specified
   */
  includes(value: any, startIndex: number): boolean

  /**
   * Return the index of the value in the array, or `-1`
   * @param value The value to check for
   * @param startIndex (optional) the index to search from, or 0 if not specified
   */
  indexOf(value: any, startIndex: number): any

  /**
   * Join all elements of this array together into one string, using 'separator' between them. eg. ```[1,2,3].join(' ')=='1 2 3'```
   * @param separator The separator
   */
  join(separator: any): any

  /**
   * Return an array which is made from the following: ```A.map(function) = [function(A[0]), function(A[1]), ...]```
   * 
   *  **Note:** This returns an `ArrayBuffer` of the same type it was called on. To get an `Array`, use `Array.map`, eg. `[].map.call(myArray, x=>x+1)`
   * @param function Function used to map one item to another
   * @param thisArg if specified, the function is called with 'this' set to thisArg (optional)
   */
  map(function: any, thisArg: any): ArrayBufferView

  /**
   * Execute `previousValue=initialValue` and then `previousValue = callback(previousValue, currentValue, index, array)` for each element in the array, and finally return previousValue.
   * @param callback Function used to reduce the array
   * @param initialValue if specified, the initial value to pass to the function
   */
  reduce(callback: any, initialValue: any): any

  /**
   * Reverse the contents of this `ArrayBufferView` in-place
   */
  reverse(): ArrayBufferView

  /**
   * Copy the contents of `array` into this one, mapping `this[x+offset]=array[x];`
   * @param arr Floating point index to access
   * @param offset The offset in this array at which to write the values (optional)
   */
  set(arr: any, offset: int32): void

  /**
   * Return a copy of a portion of this array (in a new array).
   * 
   *  **Note:** This currently returns a normal `Array`, not an `ArrayBuffer`
   * @param start Start index
   * @param end End index (optional)
   */
  slice(start: number, end: any): Array

  /**
   * Do an in-place quicksort of the array
   * @param var A function to use to compare array elements (or undefined)
   */
  sort(var: any): ArrayBufferView

  /**
   * Returns a smaller part of this array which references the same data (it doesn't copy it).
   * @param begin Element to begin at, inclusive. If negative, this is from the end of the array. The entire array is included if this isn't specified
   * @param end Element to end at, exclusive. If negative, it is relative to the end of the array. If not specified the whole array is included
   */
  subarray(begin: number, end: any): ArrayBufferView
}

/**
 * This is the built-in JavaScript class for a typed array of 8 bit unsigned integers.
 * 
 * Instantiate this in order to efficiently store arrays of data (Espruino's normal arrays store data in a map, which is inefficient for non-sparse arrays).
 * 
 * Arrays of this type include all the methods from [ArrayBufferView](/Reference#ArrayBufferView)
 */
class Uint8Array {
  /**
   * Create a typed array based on the given input. Either an existing Array Buffer, an Integer as a Length, or a simple array. If an `ArrayBufferView` (eg. `Uint8Array` rather than `ArrayBuffer`) is given, it will be completely copied rather than referenced.
   * @param arr The array or typed array to base this off, or an integer which is the array length
   * @param byteOffset The byte offset in the ArrayBuffer  (ONLY IF the first argument was an ArrayBuffer)
   * @param length The length (ONLY IF the first argument was an ArrayBuffer)
   */
  constructor(arr: any, byteOffset: number, length: number)
}

/**
 * This is the built-in JavaScript class for a typed array of 8 bit unsigned integers that are automatically clamped to the range 0 to 255.
 * 
 * Instantiate this in order to efficiently store arrays of data (Espruino's normal arrays store data in a map, which is inefficient for non-sparse arrays).
 * 
 * Arrays of this type include all the methods from [ArrayBufferView](/Reference#ArrayBufferView)
 */
class Uint8ClampedArray {
  /**
   * Create a typed array based on the given input. Either an existing Array Buffer, an Integer as a Length, or a simple array. If an `ArrayBufferView` (eg. `Uint8Array` rather than `ArrayBuffer`) is given, it will be completely copied rather than referenced.
   * 
   * Clamped arrays clamp their values to the allowed range, rather than 'wrapping'. e.g. after `a[0]=12345;`, `a[0]==255`.
   * @param arr The array or typed array to base this off, or an integer which is the array length
   * @param byteOffset The byte offset in the ArrayBuffer  (ONLY IF the first argument was an ArrayBuffer)
   * @param length The length (ONLY IF the first argument was an ArrayBuffer)
   */
  constructor(arr: any, byteOffset: number, length: number)
}

/**
 * This is the built-in JavaScript class for a typed array of 8 bit signed integers.
 * 
 * Instantiate this in order to efficiently store arrays of data (Espruino's normal arrays store data in a map, which is inefficient for non-sparse arrays).
 * 
 * Arrays of this type include all the methods from [ArrayBufferView](/Reference#ArrayBufferView)
 */
class Int8Array {
  /**
   * Create a typed array based on the given input. Either an existing Array Buffer, an Integer as a Length, or a simple array. If an `ArrayBufferView` (eg. `Uint8Array` rather than `ArrayBuffer`) is given, it will be completely copied rather than referenced.
   * @param arr The array or typed array to base this off, or an integer which is the array length
   * @param byteOffset The byte offset in the ArrayBuffer  (ONLY IF the first argument was an ArrayBuffer)
   * @param length The length (ONLY IF the first argument was an ArrayBuffer)
   */
  constructor(arr: any, byteOffset: number, length: number)
}

/**
 * This is the built-in JavaScript class for a typed array of 16 bit unsigned integers.
 * 
 * Instantiate this in order to efficiently store arrays of data (Espruino's normal arrays store data in a map, which is inefficient for non-sparse arrays).
 * 
 * Arrays of this type include all the methods from [ArrayBufferView](/Reference#ArrayBufferView)
 */
class Uint16Array {
  /**
   * Create a typed array based on the given input. Either an existing Array Buffer, an Integer as a Length, or a simple array. If an `ArrayBufferView` (eg. `Uint8Array` rather than `ArrayBuffer`) is given, it will be completely copied rather than referenced.
   * @param arr The array or typed array to base this off, or an integer which is the array length
   * @param byteOffset The byte offset in the ArrayBuffer  (ONLY IF the first argument was an ArrayBuffer)
   * @param length The length (ONLY IF the first argument was an ArrayBuffer)
   */
  constructor(arr: any, byteOffset: number, length: number)
}

/**
 * This is the built-in JavaScript class for a typed array of 16 bit signed integers.
 * 
 * Instantiate this in order to efficiently store arrays of data (Espruino's normal arrays store data in a map, which is inefficient for non-sparse arrays).
 * 
 * Arrays of this type include all the methods from [ArrayBufferView](/Reference#ArrayBufferView)
 */
class Int16Array {
  /**
   * Create a typed array based on the given input. Either an existing Array Buffer, an Integer as a Length, or a simple array. If an `ArrayBufferView` (eg. `Uint8Array` rather than `ArrayBuffer`) is given, it will be completely copied rather than referenced.
   * @param arr The array or typed array to base this off, or an integer which is the array length
   * @param byteOffset The byte offset in the ArrayBuffer  (ONLY IF the first argument was an ArrayBuffer)
   * @param length The length (ONLY IF the first argument was an ArrayBuffer)
   */
  constructor(arr: any, byteOffset: number, length: number)
}

/**
 * This is the built-in JavaScript class for a typed array of 24 bit unsigned integers.
 * 
 * Instantiate this in order to efficiently store arrays of data (Espruino's normal arrays store data in a map, which is inefficient for non-sparse arrays).
 * 
 * Arrays of this type include all the methods from [ArrayBufferView](/Reference#ArrayBufferView)
 */
class Uint24Array {
  /**
   * Create a typed array based on the given input. Either an existing Array Buffer, an Integer as a Length, or a simple array. If an `ArrayBufferView` (eg. `Uint8Array` rather than `ArrayBuffer`) is given, it will be completely copied rather than referenced.
   * @param arr The array or typed array to base this off, or an integer which is the array length
   * @param byteOffset The byte offset in the ArrayBuffer  (ONLY IF the first argument was an ArrayBuffer)
   * @param length The length (ONLY IF the first argument was an ArrayBuffer)
   */
  constructor(arr: any, byteOffset: number, length: number)
}

/**
 * This is the built-in JavaScript class for a typed array of 32 bit unsigned integers.
 * 
 * Instantiate this in order to efficiently store arrays of data (Espruino's normal arrays store data in a map, which is inefficient for non-sparse arrays).
 * 
 * Arrays of this type include all the methods from [ArrayBufferView](/Reference#ArrayBufferView)
 */
class Uint32Array {
  /**
   * Create a typed array based on the given input. Either an existing Array Buffer, an Integer as a Length, or a simple array. If an `ArrayBufferView` (eg. `Uint8Array` rather than `ArrayBuffer`) is given, it will be completely copied rather than referenced.
   * @param arr The array or typed array to base this off, or an integer which is the array length
   * @param byteOffset The byte offset in the ArrayBuffer  (ONLY IF the first argument was an ArrayBuffer)
   * @param length The length (ONLY IF the first argument was an ArrayBuffer)
   */
  constructor(arr: any, byteOffset: number, length: number)
}

/**
 * This is the built-in JavaScript class for a typed array of 32 bit signed integers.
 * 
 * Instantiate this in order to efficiently store arrays of data (Espruino's normal arrays store data in a map, which is inefficient for non-sparse arrays).
 * 
 * Arrays of this type include all the methods from [ArrayBufferView](/Reference#ArrayBufferView)
 */
class Int32Array {
  /**
   * Create a typed array based on the given input. Either an existing Array Buffer, an Integer as a Length, or a simple array. If an `ArrayBufferView` (eg. `Uint8Array` rather than `ArrayBuffer`) is given, it will be completely copied rather than referenced.
   * @param arr The array or typed array to base this off, or an integer which is the array length
   * @param byteOffset The byte offset in the ArrayBuffer  (ONLY IF the first argument was an ArrayBuffer)
   * @param length The length (ONLY IF the first argument was an ArrayBuffer)
   */
  constructor(arr: any, byteOffset: number, length: number)
}

/**
 * This is the built-in JavaScript class for a typed array of 32 bit floating point values.
 * 
 * Instantiate this in order to efficiently store arrays of data (Espruino's normal arrays store data in a map, which is inefficient for non-sparse arrays).
 * 
 * Arrays of this type include all the methods from [ArrayBufferView](/Reference#ArrayBufferView)
 */
class Float32Array {
  /**
   * Create a typed array based on the given input. Either an existing Array Buffer, an Integer as a Length, or a simple array. If an `ArrayBufferView` (eg. `Uint8Array` rather than `ArrayBuffer`) is given, it will be completely copied rather than referenced.
   * @param arr The array or typed array to base this off, or an integer which is the array length
   * @param byteOffset The byte offset in the ArrayBuffer  (ONLY IF the first argument was an ArrayBuffer)
   * @param length The length (ONLY IF the first argument was an ArrayBuffer)
   */
  constructor(arr: any, byteOffset: number, length: number)
}

/**
 * This is the built-in JavaScript class for a typed array of 64 bit floating point values.
 * 
 * Instantiate this in order to efficiently store arrays of data (Espruino's normal arrays store data in a map, which is inefficient for non-sparse arrays).
 * 
 * Arrays of this type include all the methods from [ArrayBufferView](/Reference#ArrayBufferView)
 */
class Float64Array {
  /**
   * Create a typed array based on the given input. Either an existing Array Buffer, an Integer as a Length, or a simple array. If an `ArrayBufferView` (eg. `Uint8Array` rather than `ArrayBuffer`) is given, it will be completely copied rather than referenced.
   * @param arr The array or typed array to base this off, or an integer which is the array length
   * @param byteOffset The byte offset in the ArrayBuffer  (ONLY IF the first argument was an ArrayBuffer)
   * @param length The length (ONLY IF the first argument was an ArrayBuffer)
   */
  constructor(arr: any, byteOffset: number, length: number)
}

/**
 * This class helps
 */
class DataView {
  /**
   * Create a `DataView` object that can be used to access the data in an `ArrayBuffer`.
   * 
   * ```
   * var b = new ArrayBuffer(8)
   * var v = new DataView(b)
   * v.setUint16(0,"0x1234")
   * v.setUint8(3,"0x56")
   * console.log("0x"+v.getUint32(0).toString(16))
   * // prints 0x12340056
   * ```
   * @param buffer The `ArrayBuffer` to base this on
   * @param byteOffset (optional) The offset of this view in bytes
   * @param byteLength (optional) The length in bytes
   */
  constructor(buffer: any, byteOffset: number, byteLength: number)

  /**
   * @param byteOffset The offset in bytes to read from
   * @param littleEndian (optional) Whether to read in little endian - if false or undefined data is read as big endian
   */
  getFloat32(byteOffset: number, littleEndian: boolean): any

  /**
   * @param byteOffset The offset in bytes to read from
   * @param littleEndian (optional) Whether to read in little endian - if false or undefined data is read as big endian
   */
  getFloat64(byteOffset: number, littleEndian: boolean): any

  /**
   * @param byteOffset The offset in bytes to read from
   * @param littleEndian (optional) Whether to read in little endian - if false or undefined data is read as big endian
   */
  getInt16(byteOffset: number, littleEndian: boolean): any

  /**
   * @param byteOffset The offset in bytes to read from
   * @param littleEndian (optional) Whether to read in little endian - if false or undefined data is read as big endian
   */
  getInt32(byteOffset: number, littleEndian: boolean): any

  /**
   * @param byteOffset The offset in bytes to read from
   * @param littleEndian (optional) Whether to read in little endian - if false or undefined data is read as big endian
   */
  getInt8(byteOffset: number, littleEndian: boolean): any

  /**
   * @param byteOffset The offset in bytes to read from
   * @param littleEndian (optional) Whether to read in little endian - if false or undefined data is read as big endian
   */
  getUint16(byteOffset: number, littleEndian: boolean): any

  /**
   * @param byteOffset The offset in bytes to read from
   * @param littleEndian (optional) Whether to read in little endian - if false or undefined data is read as big endian
   */
  getUint32(byteOffset: number, littleEndian: boolean): any

  /**
   * @param byteOffset The offset in bytes to read from
   * @param littleEndian (optional) Whether to read in little endian - if false or undefined data is read as big endian
   */
  getUint8(byteOffset: number, littleEndian: boolean): any

  /**
   * @param byteOffset The offset in bytes to read from
   * @param value The value to write
   * @param littleEndian (optional) Whether to read in little endian - if false or undefined data is read as big endian
   */
  setFloat32(byteOffset: number, value: any, littleEndian: boolean): void

  /**
   * @param byteOffset The offset in bytes to read from
   * @param value The value to write
   * @param littleEndian (optional) Whether to read in little endian - if false or undefined data is read as big endian
   */
  setFloat64(byteOffset: number, value: any, littleEndian: boolean): void

  /**
   * @param byteOffset The offset in bytes to read from
   * @param value The value to write
   * @param littleEndian (optional) Whether to read in little endian - if false or undefined data is read as big endian
   */
  setInt16(byteOffset: number, value: any, littleEndian: boolean): void

  /**
   * @param byteOffset The offset in bytes to read from
   * @param value The value to write
   * @param littleEndian (optional) Whether to read in little endian - if false or undefined data is read as big endian
   */
  setInt32(byteOffset: number, value: any, littleEndian: boolean): void

  /**
   * @param byteOffset The offset in bytes to read from
   * @param value The value to write
   * @param littleEndian (optional) Whether to read in little endian - if false or undefined data is read as big endian
   */
  setInt8(byteOffset: number, value: any, littleEndian: boolean): void

  /**
   * @param byteOffset The offset in bytes to read from
   * @param value The value to write
   * @param littleEndian (optional) Whether to read in little endian - if false or undefined data is read as big endian
   */
  setUint16(byteOffset: number, value: any, littleEndian: boolean): void

  /**
   * @param byteOffset The offset in bytes to read from
   * @param value The value to write
   * @param littleEndian (optional) Whether to read in little endian - if false or undefined data is read as big endian
   */
  setUint32(byteOffset: number, value: any, littleEndian: boolean): void

  /**
   * @param byteOffset The offset in bytes to read from
   * @param value The value to write
   * @param littleEndian (optional) Whether to read in little endian - if false or undefined data is read as big endian
   */
  setUint8(byteOffset: number, value: any, littleEndian: boolean): void
}

/**
 * The built-in class for handling Dates.
 * 
 * **Note:** By default the time zone is GMT+0, however you can change the
 * timezone using the `E.setTimeZone(...)` function.
 * 
 * For example `E.setTimeZone(1)` will be GMT+0100
 */
class Date {
  /**
   * Creates a date object
   * @param args Either nothing (current time), one numeric argument (milliseconds since 1970), a date string (see `Date.parse`), or [year, month, day, hour, minute, second, millisecond] 
   */
  constructor(args: JsVarArray)

  /**
   * Day of the month 1..31
   */
  getDate(): int32

  /**
   * Day of the week (0=sunday, 1=monday, etc)
   */
  getDay(): int32

  /**
   * The year, eg. 2014
   */
  getFullYear(): int32

  /**
   * 0..23
   */
  getHours(): int32

  /**
   * 0..999
   */
  getMilliseconds(): int32

  /**
   * 0..59
   */
  getMinutes(): int32

  /**
   * Month of the year 0..11
   */
  getMonth(): int32

  /**
   * 0..59
   */
  getSeconds(): int32

  /**
   * Return the number of milliseconds since 1970
   */
  getTime(): number

  /**
   * This returns Espruino's time-zone offset from UTC, in minutes.
   * 
   * This is set with `E.setTimeZone` and is System-wide. The value returned
   * has nothing to do with the instance of `Date` that it is called on.
   */
  getTimezoneOffset(): int32

  /**
   * Day of the month 1..31
   * @param dayValue the day of the month, between 0 and 31
   */
  setDate(dayValue: number): number

  /**
   * @param yearValue The full year - eg. 1989
   * @param yearValue optional - the month, between 0 and 11
   * @param dayValue optional - the day, between 0 and 31
   */
  setFullYear(yearValue: number, yearValue: any, dayValue: any): number

  /**
   * 0..23
   * @param hoursValue number of hours, 0..23
   * @param minutesValue number of minutes, 0..59
   * @param secondsValue optional - number of seconds, 0..59
   * @param millisecondsValue optional - number of milliseconds, 0..999
   */
  setHours(hoursValue: number, minutesValue: any, secondsValue: any, millisecondsValue: any): number

  /**
   * @param millisecondsValue number of milliseconds, 0..999
   */
  setMilliseconds(millisecondsValue: number): number

  /**
   * 0..59
   * @param minutesValue number of minutes, 0..59
   * @param secondsValue optional - number of seconds, 0..59
   * @param millisecondsValue optional - number of milliseconds, 0..999
   */
  setMinutes(minutesValue: number, secondsValue: any, millisecondsValue: any): number

  /**
   * Month of the year 0..11
   * @param yearValue The month, between 0 and 11
   * @param dayValue optional - the day, between 0 and 31
   */
  setMonth(yearValue: number, dayValue: any): number

  /**
   * 0..59
   * @param secondsValue number of seconds, 0..59
   * @param millisecondsValue optional - number of milliseconds, 0..999
   */
  setSeconds(secondsValue: number, millisecondsValue: any): number

  /**
   * Set the time/date of this Date class
   * @param timeValue the number of milliseconds since 1970
   */
  setTime(timeValue: number): number

  /**
   * Converts to a ISO 8601 String, eg: `2014-06-20T14:52:20.123Z`
   * 
   *  **Note:** This always assumes a timezone of GMT
   */
  toISOString(): any

  /**
   * Calls `Date.toISOString` to output this date to JSON
   */
  toJSON(): any

  /**
   * Converts to a String, eg: `Fri Jun 20 2014 14:52:20 GMT+0000`
   * 
   *  **Note:** This uses whatever timezone was set with `E.setTimeZone()`
   */
  toString(): any

  /**
   * Converts to a String, eg: `Fri, 20 Jun 2014 14:52:20 GMT`
   * 
   *  **Note:** This always assumes a timezone of GMT
   */
  toUTCString(): any

  /**
   * Return the number of milliseconds since 1970
   */
  valueOf(): number

  /**
   * Get the number of milliseconds elapsed since 1970 (or on embedded platforms, since startup)
   */
  static now(): number

  /**
   * Parse a date string and return milliseconds since 1970. Data can be either '2011-10-20T14:48:00', '2011-10-20' or 'Mon, 25 Dec 1995 13:30:00 +0430'
   * @param str A String
   */
  static parse(str: any): number
}

/**
 * The base class for runtime errors
 */
class Error {
  /**
   * Creates an Error object
   * @param message An optional message string
   */
  constructor(message: any)

  /**
   */
  toString(): any
}

/**
 * The base class for syntax errors
 */
class SyntaxError {
  /**
   * Creates a SyntaxError object
   * @param message An optional message string
   */
  constructor(message: any)

  /**
   */
  toString(): any
}

/**
 * The base class for type errors
 */
class TypeError {
  /**
   * Creates a TypeError object
   * @param message An optional message string
   */
  constructor(message: any)

  /**
   */
  toString(): any
}

/**
 * The base class for internal errors
 */
class InternalError {
  /**
   * Creates an InternalError object
   * @param message An optional message string
   */
  constructor(message: any)

  /**
   */
  toString(): any
}

/**
 * The base class for reference errors - where a variable
 * which doesn't exist has been accessed.
 */
class ReferenceError {
  /**
   * Creates a ReferenceError object
   * @param message An optional message string
   */
  constructor(message: any)

  /**
   */
  toString(): any
}

/**
 * This is the built-in JavaScript class for Espruino utility functions.
 */
class E {
  /**
   * Called when a media event arrives on an Apple iOS device Bangle.js is connected to
   * 
   * 
   * ```
   * {
   * id : "artist"/"album"/"title"/"duration",
   * value : "Some text",
   * truncated : bool // the 'value' was too big to be sent completely
   * }
   * ```
   * @param info An object (see below)
   */
  on(event: 'AMS', callback: (info: {id:string,value:string,truncated:boolean}) => void): void

  /**
   * Called when a notification arrives on an Apple iOS device Bangle.js is connected to
   * 
   * 
   * ```
   * {
   * event:"add",
   * uid:42,
   * category:4,
   * categoryCnt:42,
   * silent:true,
   * important:false,
   * preExisting:true,
   * positive:false,
   * negative:true
   * }
   * ```
   * 
   * You can then get more information with something like:
   * 
   * ```
   * NRF.ancsGetNotificationInfo( event.uid ).then(a=>print("Notify",E.toJS(a)));
   * ```
   * @param info An object (see below)
   */
  on(event: 'ANCS', callback: (info: {event:string,uid:number,category:number,categoryCnt:number,silent:boolean,important:boolean,preExisting:boolean,positive:boolean,negative:boolean}) => void): void

  /**
   * Provide assembly to Espruino.
   * 
   * **This function is not part of Espruino**. Instead, it is detected
   * by the Espruino IDE (or command-line tools) at upload time and is
   * replaced with machine code and an `E.nativeCall` call.
   * 
   * See [the documentation on the Assembler](http://www.espruino.com/Assembler) for more information.
   * @param callspec The arguments this assembly takes - eg `void(int)`
   * @param assemblycode One of more strings of assembler code
   */
  static asm(callspec: any, assemblycode: JsVarArray): void

  /**
   * Clip a number to be between min and max (inclusive)
   * @param x A floating point value to clip
   * @param min The smallest the value should be
   * @param max The largest the value should be
   */
  static clip(x: number, min: number, max: number): number

  /**
   * Provides the ability to write C code inside your JavaScript file.
   * 
   * **This function is not part of Espruino**. Instead, it is detected
   * by the Espruino IDE (or command-line tools) at upload time, is sent
   * to our web service to be compiled, and is replaced with machine code
   * and an `E.nativeCall` call.
   * 
   * See [the documentation on Inline C](http://www.espruino.com/InlineC) for more information and examples.
   * @param code A Templated string of C code
   */
  static compiledC(code: any): void

  /**
   * Setup the filesystem so that subsequent calls to `E.openFile` and `require('fs').*` will use an SD card on the supplied SPI device and pin.
   * 
   * It can even work using software SPI - for instance:
   * 
   * ```
   * // DI/CMD = C7
   * // DO/DAT0 = C8
   * // CK/CLK = C9
   * // CD/CS/DAT3 = C6
   * var spi = new SPI();
   * spi.setup({mosi:C7, miso:C8, sck:C9});
   * E.connectSDCard(spi, C6);
   * console.log(require("fs").readdirSync());
   * ```
   * 
   * See [the page on File IO](http://www.espruino.com/File+IO) for more information.
   * 
   * **Note:** We'd strongly suggest you add a pullup resistor from CD/CS pin to 3.3v. It is
   * good practise to avoid accidental writes before Espruino is initialised, and some cards
   * will not work reliably without one.
   * 
   * **Note:** If you want to remove an SD card after you have started using it, you *must* call `E.unmountSD()` or you may cause damage to the card.
   * @param spi The SPI object to use for communication
   * @param csPin The pin to use for Chip Select
   */
  static connectSDCard(spi: any, csPin: Pin): void

  /**
   * Convolve arr1 with arr2. This is equivalent to `v=0;for (i in arr1) v+=arr1[i] * arr2[(i+offset) % arr2.length]`
   * @param arr1 An array to convolve
   * @param arr2 An array to convolve
   * @param offset The mean value of the array
   */
  static convolve(arr1: any, arr2: any, offset: int32): number

  /**
   * Perform a standard 32 bit CRC (Cyclic redundancy check) on the supplied data (one byte at a time)
   * and return the result as an unsigned integer.
   * @param data Iterable data to perform CRC32 on (each element treated as a byte)
   */
  static CRC32(data: any): any

  /**
   * Decode a UTF8 string.
   * 
   * * Any decoded character less than 256 gets passed straight through
   * * Otherwise if `lookup` is an array and an item with that char code exists in `lookup` then that is used
   * * Otherwise if `lookup` is an object and an item with that char code (as lowercase hex) exists in `lookup` then that is used
   * * Otherwise `replaceFn(charCode)` is called and the result used if `replaceFn` is a function
   * * If `replaceFn` is a string, that is used
   * * Or finally if nothing else matches, the character is ignored
   * 
   * For instance:
   * 
   * ```
   * let unicodeRemap = {
   *   0x20ac:"\u0080", // Euro symbol
   *   0x2026:"\u0085", // Ellipsis
   * };
   * E.decodeUTF8("UTF-8 Euro: \u00e2\u0082\u00ac", unicodeRemap, '[?]') == "UTF-8 Euro: \u0080"
   * ```
   * @param str A string of UTF8-encoded data
   * @param lookup An array containing a mapping of character code -> replacement string
   * @param replaceFn If not in lookup, `replaceFn(charCode)` is called and the result used if it's a function, *or* if it's a string, the string value is used
   */
  static decodeUTF8(str: any, lookup: any, replaceFn: any): any

  /**
   * BETA: defragment memory!
   */
  static defrag(): void

  /**
   * Show fragmentation.
   * 
   * * ` ` is free space
   * * `#` is a normal variable
   * * `L` is a locked variable (address used, cannopt be moved)
   * * `=` represents data in a Flat String (must be contiguous)
   */
  static dumpFragmentation(): void

  /**
   * Dump any locked variables that aren't referenced from `global` - for debugging memory leaks only.
   */
  static dumpFreeList(): void

  /**
   * Dump any locked variables that aren't referenced from `global` - for debugging memory leaks only.
   */
  static dumpLockedVars(): void

  /**
   * Get the current interpreter state in a text form such that it can be copied to a new device
   */
  static dumpStr(): String

  /**
   * Output the current list of Utility Timer Tasks - for debugging only
   */
  static dumpTimers(): void

  /**
   * Dumps a comma-separated list of all allocated variables
   * along with the variables they link to. Can be used
   * to visualise where memory is used.
   */
  static dumpVariables(): void

  /**
   * Enable the watchdog timer. This will reset Espruino if it isn't able to return to the idle loop within the timeout.
   * 
   * If `isAuto` is false, you must call `E.kickWatchdog()` yourself every so often or the chip will reset.
   * 
   * ```
   * E.enableWatchdog(0.5); // automatic mode
   * while(1); // Espruino will reboot because it has not been idle for 0.5 sec
   * ```
   * 
   * ```
   * E.enableWatchdog(1, false);
   * setInterval(function() {
   *   if (everything_ok)
   *     E.kickWatchdog();
   * }, 500);
   * // Espruino will now reset if everything_ok is false,
   * // or if the interval fails to be called
   * ```
   * 
   * **NOTE:** This is only implemented on STM32 and nRF5x devices (all official Espruino boards).
   * 
   * **NOTE:** On STM32 (Pico, WiFi, Original) with `setDeepSleep(1)` you need to
   * explicitly wake Espruino up with an interval of less than the watchdog timeout or the watchdog will fire and
   * the board will reboot. You can do this with `setInterval("", time_in_milliseconds)`.
   * @param timeout The timeout in seconds before a watchdog reset
   * @param isAuto If undefined or true, the watchdog is kicked automatically. If not, you must call `E.kickWatchdog()` yourself
   */
  static enableWatchdog(timeout: number, isAuto: any): void

  /**
   * Performs a Fast Fourier Transform (FFT) in 32 bit floats on the supplied data and writes it back into the
   * original arrays. Note that if only one array is supplied, the data written back is the modulus of the complex
   * result `sqrt(r*r+i*i)`.
   * 
   * In order to perform the FFT, there has to be enough room on the stack to allocate two arrays of 32 bit
   * floating point numbers - this will limit the maximum size of FFT possible to around 1024 items on
   * most platforms.
   * 
   * **Note:** on the Original Espruino board, FFTs are performed in 64bit arithmetic as there isn't
   * space to include the 32 bit maths routines (2x more RAM is required).
   * @param arrReal An array of real values
   * @param arrImage An array of imaginary values (or if undefined, all values will be taken to be 0)
   * @param inverse Set this to true if you want an inverse FFT - otherwise leave as 0
   */
  static FFT(arrReal: any, arrImage: any, inverse: boolean): void

  /**
   * Change the paramters used for the flash filesystem.
   * The default address is the last 1Mb of 4Mb Flash, 0x300000, with total size of 1Mb.
   * 
   * Before first use the media needs to be formatted.
   * 
   * ```
   * fs=require("fs");
   * try {
   *   fs.readdirSync();
   *  } catch (e) { //'Uncaught Error: Unable to mount media : NO_FILESYSTEM'
   *   console.log('Formatting FS - only need to do once');
   *   E.flashFatFS({ format: true });
   * }
   * fs.writeFileSync("bang.txt", "This is the way the world ends\nnot with a bang but a whimper.\n");
   * fs.readdirSync();
   * ```
   * 
   * This will create a drive of 100 * 4096 bytes at 0x300000. Be careful with the selection of flash addresses as you can overwrite firmware!
   * You only need to format once, as each will erase the content.
   * 
   * `E.flashFatFS({ addr:0x300000,sectors:100,format:true });`
   * @param options An optional object `{ addr : int=0x300000, sectors : int=256, format : bool=false }`,addr : start address in flash,sectors: number of sectors to use,format:  Format the media
   */
  static flashFatFS(options: any): boolean

  /**
   * Return the address in memory of the given variable. This can then
   * be used with `peek` and `poke` functions. However, changing data in
   * JS variables directly (flatAddress=false) will most likely result in a crash.
   * 
   * This functions exists to allow embedded targets to set up
   * peripherals such as DMA so that they write directly to
   * JS variables.
   * 
   * See http://www.espruino.com/Internals for more information
   * @param v A variable to get the address of
   * @param flatAddress (boolean) If `true` and a Flat String or Flat ArrayBuffer is supplied, return the address of the data inside it - otherwise 0. If `false` (the default) return the address of the JsVar itself.
   */
  static getAddressOf(v: any, flatAddress: boolean): number

  /**
   * Check the internal voltage reference. To work out an actual voltage of an input pin, you can use `analogRead(pin)*E.getAnalogVRef()`
   * 
   *  **Note:** This value is calculated by reading the voltage on an internal voltage reference with the ADC.
   * It will be slightly noisy, so if you need this for accurate measurements we'd recommend that you call
   * this function several times and average the results.
   * 
   * While this is implemented on Espruino boards, it may not be implemented on other devices. If so it'll return NaN.
   */
  static getAnalogVRef(): number

  /**
   * In devices that come with batteries, this function returns
   * the battery charge percentage as an integer between 0 and 100.
   * 
   * **Note:** this is an estimation only, based on battery voltage.
   * The temperature of the battery (as well as the load being drawn
   * from it at the time `E.getBattery` is called) will affect the
   * readings.
   */
  static getBattery(): number

  /**
   * Returns the current console device - see `E.setConsole` for more information.
   */
  static getConsole(): any

  /**
   * Get and reset the error flags. Returns an array that can contain:
   * 
   * `'FIFO_FULL'`: The receive FIFO filled up and data was lost. This could be state transitions for setWatch, or received characters.
   * 
   * `'BUFFER_FULL'`: A buffer for a stream filled up and characters were lost. This can happen to any stream - Serial,HTTP,etc.
   * 
   * `'CALLBACK'`: A callback (`setWatch`, `setInterval`, `on('data',...)`) caused an error and so was removed.
   * 
   * `'LOW_MEMORY'`: Memory is running low - Espruino had to run a garbage collection pass or remove some of the command history
   * 
   * `'MEMORY'`: Espruino ran out of memory and was unable to allocate some data that it needed.
   * 
   * `'UART_OVERFLOW'` : A UART received data but it was not read in time and was lost
   */
  static getErrorFlags(): any

  /**
   * Get Espruino's interpreter flags that control the way it handles your JavaScript code.
   * 
   * * `deepSleep` - Allow deep sleep modes (also set by setDeepSleep)
   * * `pretokenise` - When adding functions, pre-minify them and tokenise reserved words
   * * `unsafeFlash` - Some platforms stop writes/erases to interpreter memory to stop you bricking the device accidentally - this removes that protection
   * * `unsyncFiles` - When writing files, *don't* flush all data to the SD card after each command (the default is *to* flush). This is much faster, but can cause filesystem damage if power is lost without the filesystem unmounted.
   */
  static getFlags(): any

  /**
   * Gets the RTC's current prescaler value if `calibrate` is undefined or false.
   * 
   * If `calibrate` is true, the low speed oscillator's speed is calibrated against the high speed
   * oscillator (usually +/- 20 ppm) and a suggested value to be fed into `E.setRTCPrescaler(...)` is returned.
   * 
   * See `E.setRTCPrescaler` for more information.
   * @param calibrate If `false`, the current value. If `true`, the calculated 'correct' value
   */
  static getRTCPrescaler(calibrate: boolean): number

  /**
   * Return the number of variable blocks used by the supplied variable. This is
   * useful if you're running out of memory and you want to be able to see what
   * is taking up most of the available space.
   * 
   * If `depth>0` and the variable can be recursed into, an array listing all property
   * names (including internal Espruino names) and their sizes is returned. If
   * `depth>1` there is also a `more` field that inspects the objects's children's
   * children.
   * 
   * For instance `E.getSizeOf(function(a,b) { })` returns `5`.
   * 
   * But `E.getSizeOf(function(a,b) { }, 1)` returns:
   * 
   * ```
   *  [
   *   {
   *     "name": "a",
   *     "size": 1 },
   *   {
   *     "name": "b",
   *     "size": 1 },
   *   {
   *     "name": "\xFFcod",
   *     "size": 2 }
   *  ]
   * ```
   * 
   * In this case setting depth to `2` will make no difference as there are
   * no more children to traverse.
   * 
   * See http://www.espruino.com/Internals for more information
   * @param v A variable to get the size of
   * @param depth The depth that detail should be provided for. If depth<=0 or undefined, a single integer will be returned
   */
  static getSizeOf(v: any, depth: number): any

  /**
   * Use the microcontroller's internal thermistor to work out the temperature.
   * 
   * On Puck.js v2.0 this will use the on-board PCT2075TP temperature sensor, but on other devices it may not be desperately well calibrated.
   * 
   * While this is implemented on Espruino boards, it may not be implemented on other devices. If so it'll return NaN.
   * 
   *  **Note:** This is not entirely accurate and varies by a few degrees from chip to chip. It measures the **die temperature**, so when connected to USB it could be reading 10 over degrees C above ambient temperature. When running from battery with `setDeepSleep(true)` it is much more accurate though.
   */
  static getTemperature(): number

  /**
   * Convert hue, saturation and brightness to red, green and blue (packed into an integer if `asArray==false` or an array if `asArray==true`).
   * 
   * This replaces `Graphics.setColorHSB` and `Graphics.setBgColorHSB`. On devices with 24 bit colour it can
   * be used as: `Graphics.setColor(E.HSBtoRGB(h, s, b))`
   * 
   * You can quickly set RGB items in an Array or Typed Array using `array.set(E.HSBtoRGB(h, s, b,true), offset)`,
   * which can be useful with arrays used with `require("neopixel").write`.
   * @param hue The hue, as a value between 0 and 1
   * @param sat The saturation, as a value between 0 and 1
   * @param bri The brightness, as a value between 0 and 1
   * @param asArray If true, return an array of [R,G,B] values betwen 0 and 255
   */
  static HSBtoRGB(hue: number, sat: number, bri: number, asArray: boolean): any

  /**
   * Unlike 'Math.random()' which uses a pseudo-random number generator, this
   * method reads from the internal voltage reference several times, xoring and
   * rotating to try and make a relatively random value from the noise in the
   * signal.
   */
  static hwRand(): int32

  /**
   * Kicks a Watchdog timer set up with `E.enableWatchdog(..., false)`. See
   * `E.enableWatchdog` for more information.
   * 
   * **NOTE:** This is only implemented on STM32 and nRF5x devices (all official Espruino boards).
   */
  static kickWatchdog(): void

  /**
   * If a password has been set with `E.setPassword()`, this will lock the console
   * so the password needs to be entered to unlock it.
   */
  static lockConsole(): void

  /**
   * Search in an Object, Array, or Function
   * @param haystack The Array/Object/Function to search
   * @param needle The key to search for
   * @param returnKey If true, return the key, else return the value itself
   */
  static lookupNoCase(haystack: any, needle: any, returnKey: boolean): any

  /**
   * Take each element of the `from` array, look it up in `map` (or call `map(value,index)`
   * if it is a function), and write it into the corresponding
   * element in the `to` array.
   * 
   * You can use an array to map:
   * 
   * ```
   * var a = new Uint8Array([1,2,3,1,2,3]);
   * var lut = new Uint8Array([128,129,130,131]);
   * E.mapInPlace(a, a, lut);
   * // a = [129, 130, 131, 129, 130, 131]
   * ```
   * 
   * Or `undefined` to pass straight through, or a function to do a normal 'mapping':
   * 
   * ```
   * var a = new Uint8Array([0x12,0x34,0x56,0x78]);
   * var b = new Uint8Array(8);
   * E.mapInPlace(a, b, undefined); // straight through
   * // b = [0x12,0x34,0x56,0x78,0,0,0,0]
   * E.mapInPlace(a, b, (value,index)=>index); // write the index in the first 4 (because a.length==4)
   * // b = [0,1,2,3,4,0,0,0]
   * E.mapInPlace(a, b, undefined, 4); // 4 bits from 8 bit input -> 2x as many outputs, msb-first
   * // b = [1, 2, 3, 4, 5, 6, 7, 8]
   *  E.mapInPlace(a, b, undefined, -4); // 4 bits from 8 bit input -> 2x as many outputs, lsb-first
   * // b = [2, 1, 4, 3, 6, 5, 8, 7]
   * E.mapInPlace(a, b, a=>a+2, 4);
   * // b = [3, 4, 5, 6, 7, 8, 9, 10]
   * var b = new Uint16Array(4);
   * E.mapInPlace(a, b, undefined, 12); // 12 bits from 8 bit input, msb-first
   * // b = [0x123, 0x456, 0x780, 0]
   * E.mapInPlace(a, b, undefined, -12); // 12 bits from 8 bit input, lsb-first
   * // b = [0x412, 0x563, 0x078, 0]
   * ```
   * @param from An ArrayBuffer to read elements from
   * @param to An ArrayBuffer to write elements too
   * @param map An array or `function(value,index)` to use to map one element to another, or `undefined` to provide no mapping
   * @param bits If specified, the number of bits per element (MSB first) - otherwise use a 1:1 mapping. If negative, use LSB first.
   */
  static mapInPlace(from: any, to: any, map: any, bits: number): void

  /**
   * This creates and returns a special type of string, which actually references
   * a specific memory address. It can be used in order to use sections of
   * Flash memory directly in Espruino (for example to execute code straight
   * from flash memory with `eval(E.memoryArea( ... ))`)
   * 
   * **Note:** This is only tested on STM32-based platforms (Espruino Original
   * and Espruino Pico) at the moment.
   * @param addr The address of the memory area
   * @param len The length (in bytes) of the memory area
   */
  static memoryArea(addr: number, len: number): String

  /**
   * Create an object where every field accesses a specific 32 bit address in the microcontroller's memory. This
   * is perfect for accessing on-chip peripherals.
   * 
   * ```
   * // for NRF52 based chips
   * var GPIO = E.memoryMap(0x50000000,{OUT:0x504, OUTSET:0x508, OUTCLR:0x50C, IN:0x510, DIR:0x514, DIRSET:0x518, DIRCLR:0x51C});
   * GPIO.DIRSET = 1; // set GPIO0 to output
   * GPIO.OUT ^= 1; // toggle the output state of GPIO0
   * ```
   * @param baseAddress The base address (added to every address in `registers`)
   * @param registers An object containing `{name:address}`
   */
  static memoryMap(baseAddress: any, registers: any): any

  /**
   * ADVANCED: This is a great way to crash Espruino if you're not sure what you are doing
   * 
   * Create a native function that executes the code at the given address. Eg. `E.nativeCall(0x08012345,'double (double,double)')(1.1, 2.2)`
   * 
   * If you're executing a thumb function, you'll almost certainly need to set the bottom bit of the address to 1.
   * 
   * Note it's not guaranteed that the call signature you provide can be used - there are limits on the number of arguments allowed.
   * 
   * When supplying `data`, if it is a 'flat string' then it will be used directly, otherwise it'll be converted to a flat string and used.
   * @param addr The address in memory of the function (or offset in `data` if it was supplied
   * @param sig The signature of the call, `returnType (arg1,arg2,...)`. Allowed types are `void`,`bool`,`int`,`double`,`Pin`,`JsVar`
   * @param data (Optional) A string containing the function itself. If not supplied then 'addr' is used as an absolute address.
   */
  static nativeCall(addr: number, sig: any, data: any): any

  /**
   * Open a file
   * @param path the path to the file to open.
   * @param mode The mode to use when opening the file. Valid values for mode are 'r' for read, 'w' for write new, 'w+' for write existing, and 'a' for append. If not specified, the default is 'r'.
   */
  static openFile(path: any, mode: any): File

  /**
   * @param source The source file/stream that will send content.
   * @param destination The destination file/stream that will receive content from the source.
   * @param options An optional object `{ chunkSize : int=64, end : bool=true, complete : function }`,chunkSize : The amount of data to pipe from source to destination at a time,complete : a function to call when the pipe activity is complete,end : call the 'end' function on the destination when the source is finished
   */
  static pipe(source: any, destination: any, options: any): void

  /**
   * Forces a hard reboot of the microcontroller - as close as possible
   * to if the reset pin had been toggled.
   * 
   * **Note:** This is different to `reset()`, which performs a software
   * reset of Espruino (resetting the interpreter and pin states, but not
   * all the hardware)
   */
  static reboot(): void

  /**
   * Reverse the 8 bits in a byte, swapping MSB and LSB.
   * 
   * For example, `E.reverseByte(0b10010000) == 0b00001001`.
   * 
   * Note that you can reverse all the bytes in an array with: `arr = arr.map(E.reverseByte)`
   * @param x A byte value to reverse the bits of
   */
  static reverseByte(x: int32): int32

  /**
   * @param data An array of bytes to send as a USB HID packet
   */
  static sendUSBHID(data: any): boolean

  /**
   * This writes JavaScript code into Espruino's flash memory, to be executed on
   * startup. It differs from `save()` in that `save()` saves the whole state of
   * the interpreter, whereas this just saves JS code that is executed at boot.
   * 
   * Code will be executed before `onInit()` and `E.on('init', ...)`.
   * 
   * If `alwaysExec` is `true`, the code will be executed even after a call to
   * `reset()`. This is useful if you're making something that you want to
   * program, but you want some code that is always built in (for instance
   * setting up a display or keyboard).
   * 
   * To remove boot code that has been saved previously, use `E.setBootCode("")`
   * 
   * **Note:** this removes any code that was previously saved with `save()`
   * @param code The code to execute (as a string)
   * @param alwaysExec Whether to always execute the code (even after a reset)
   */
  static setBootCode(code: any, alwaysExec: boolean): void

  /**
   * This sets the clock frequency of Espruino's processor. It will return `0` if
   * it is unimplemented or the clock speed cannot be changed.
   * 
   * **Note:** On pretty much all boards, UART, SPI, I2C, PWM, etc will change
   * frequency and will need setting up again in order to work.
   * 
   * ### STM32F4
   * 
   * Options is of the form `{ M: int, N: int, P: int, Q: int }` - see the 'Clocks'
   * section of the microcontroller's reference manual for what these mean.
   * 
   * * System clock = 8Mhz * N / ( M * P )
   * * USB clock (should be 48Mhz) = 8Mhz * N / ( M * Q )
   * 
   * Optional arguments are:
   * 
   * * `latency` - flash latency from 0..15
   * * `PCLK1` - Peripheral clock 1 divisor (default: 2)
   * * `PCLK2` - Peripheral clock 2 divisor (default: 4)
   * 
   * The Pico's default is `{M:8, N:336, P:4, Q:7, PCLK1:2, PCLK2:4}`, use
   * `{M:8, N:336, P:8, Q:7, PCLK:1, PCLK2:2}` to halve the system clock speed
   * while keeping the peripherals running at the same speed (omitting PCLK1/2
   * will lead to the peripherals changing speed too).
   * 
   * On STM32F4 boards (eg. Espruino Pico), the USB clock needs to be kept at 48Mhz
   * or USB will fail to work. You'll also experience USB instability if the processor
   * clock falls much below 48Mhz.
   * 
   * ### ESP8266
   * 
   * Just specify an integer value, either 80 or 160 (for 80 or 160Mhz)
   * @param options Platform-specific options for setting clock speed
   */
  static setClock(options: any): number

  /**
   * Changes the device that the JS console (otherwise known as the REPL)
   * is attached to. If the console is on a device, that
   * device can be used for programming Espruino.
   * 
   * Rather than calling `Serial.setConsole` you can call
   * `E.setConsole("DeviceName")`.
   * 
   * This is particularly useful if you just want to
   * remove the console. `E.setConsole(null)` will
   * make the console completely inaccessible.
   * 
   * `device` may be `"Serial1"`,`"USB"`,`"Bluetooth"`,`"Telnet"`,`"Terminal"`,
   * any other *hardware* `Serial` device, or `null` to disable the console completely.
   * 
   * `options` is of the form:
   * 
   * ```
   * {
   *   force : bool // default false, force the console onto this device so it does not move
   *                //   if false, changes in connection state (eg USB/Bluetooth) can move
   *                //   the console automatically.
   * }
   * ```
   * @param device 
   * @param options (optional) object of options, see below
   */
  static setConsole(device: any, options: any): void

  /**
   * Set the Espruino interpreter flags that control the way it handles your JavaScript code.
   * 
   * Run `E.getFlags()` and check its description for a list of available flags and their values.
   * @param flags An object containing flag names and boolean values. You need only specify the flags that you want to change.
   */
  static setFlags(flags: any): void

  /**
   * Set a password on the console (REPL). When powered on, Espruino will
   * then demand a password before the console can be used. If you want to
   * lock the console immediately after this you can call `E.lockConsole()`
   * 
   * To remove the password, call this function with no arguments.
   * 
   * **Note:** There is no protection against multiple password attempts, so someone
   * could conceivably try every password in a dictionary.
   * 
   * **Note:** This password is stored in memory in plain text. If someone is able
   * to execute arbitrary JavaScript code on the device (eg, you use `eval` on input
   * from unknown sources) or read the device's firmware then they may be able to
   * obtain it.
   * @param password The password - max 20 chars
   */
  static setPassword(password: any): void

  /**
   * Sets the RTC's prescaler's maximum value. This is the counter that counts up on each oscillation of the low
   * speed oscillator. When the prescaler counts to the value supplied, one second is deemed to have passed.
   * 
   * By default this is set to the oscillator's average speed as specified in the datasheet, and usually that is
   * fine. However on early [Espruino Pico](/Pico) boards the STM32F4's internal oscillator could vary by as
   * much as 15% from the value in the datasheet. In that case you may want to alter this value to reflect the
   * true RTC speed for more accurate timekeeping.
   * 
   * To change the RTC's prescaler value to a computed value based on comparing against the high speed oscillator,
   * just run the following command, making sure it's done a few seconds after the board starts up:
   * 
   * ```
   * E.setRTCPrescaler(E.getRTCPrescaler(true));
   * ```
   * 
   * When changing the RTC prescaler, the RTC 'follower' counters are reset and it can take a second or two before
   * readings from getTime are stable again.
   * 
   * To test, you can connect an input pin to a known frequency square wave and then use `setWatch`. If you don't
   * have a frequency source handy, you can check against the high speed oscillator:
   * 
   * ```
   * // connect pin B3 to B4
   * analogWrite(B3, 0.5, {freq:0.5});
   * setWatch(function(e) {
   *   print(e.time - e.lastTime);
   * }, B4, {repeat:true});
   * ```
   * 
   * **Note:** This is only used on official Espruino boards containing an STM32 microcontroller. Other boards
   * (even those using an STM32) don't use the RTC and so this has no effect.
   * @param prescaler The amount of counts for one second of the RTC - this is a 15 bit integer value (0..32767)
   */
  static setRTCPrescaler(prescaler: number): void

  /**
   * Set the time zone to be used with `Date` objects.
   * 
   * For example `E.setTimeZone(1)` will be GMT+0100
   * 
   * Time can be set with `setTime`.
   * @param zone The time zone in hours
   */
  static setTimeZone(zone: number): void

  /**
   * USB HID will only take effect next time you unplug and re-plug your Espruino. If you're
   * disconnecting it from power you'll have to make sure you have `save()`d after calling
   * this function.
   * @param opts An object containing at least reportDescriptor, an array representing the report descriptor. Pass undefined to disable HID.
   */
  static setUSBHID(opts: any): void

  /**
   * Displays a full screen prompt on the screen, with a single 'Ok' button.
   * 
   * When the button is pressed the promise is resolved.
   * 
   * ```
   * E.showAlert("Hello").then(function() {
   *   print("Ok pressed");
   * });
   * // or
   * E.showAlert("These are\nLots of\nLines","My Title").then(function() {
   *   print("Ok pressed");
   * });
   * ```
   * 
   * To remove the window, call `E.showAlert()` with no arguments.
   * @param message A message to display. Can include newlines
   * @param options (optional) a title for the message
   */
  static showAlert(message: any, options: any): any

  /**
   * Displays a full screen prompt on the screen, with a single 'Ok' button.
   * 
   * When the button is pressed the promise is resolved.
   * 
   * ```
   * E.showAlert("Hello").then(function() {
   *   print("Ok pressed");
   * });
   * // or
   * E.showAlert("These are\nLots of\nLines","My Title").then(function() {
   *   print("Ok pressed");
   * });
   * ```
   * 
   * To remove the window, call `E.showAlert()` with no arguments.
   * @param message A message to display. Can include newlines
   * @param options (optional) a title for the message
   */
  static showAlert(message: any, options: any): any

  /**
   * Display a menu on the screen, and set up the buttons to navigate through it.
   * 
   * Supply an object containing menu items. When an item is selected, the
   * function it references will be executed. For example:
   * 
   * ```
   * var boolean = false;
   * var number = 50;
   * // First menu
   * var mainmenu = {
   *   "" : { title : "-- Main Menu --" }, // options
   *   "LED On" : function() { LED1.set(); },
   *   "LED Off" : function() { LED1.reset(); },
   *   "Submenu" : function() { E.showMenu(submenu); },
   *   "A Boolean" : {
   *     value : boolean,
   *     format : v => v?"On":"Off",
   *     onchange : v => { boolean=v; }
   *   },
   *   "A Number" : {
   *     value : number,
   *     min:0,max:100,step:10,
   *     onchange : v => { number=v; }
   *   },
   *   "Exit" : function() { E.showMenu(); }, // remove the menu
   * };
   * // Submenu
   * var submenu = {
   *   "" : { title : "-- SubMenu --",
   *          back : function() { E.showMenu(mainmenu); } },
   *   "One" : undefined, // do nothing
   *   "Two" : undefined // do nothing
   * };
   * // Actually display the menu
   * E.showMenu(mainmenu);
   * ```
   * 
   * The menu will stay onscreen and active until explicitly removed,
   * which you can do by calling `E.showMenu()` without arguments.
   * 
   * See http://www.espruino.com/graphical_menu for more detailed information.
   * 
   * On Bangle.js there are a few additions over the standard `graphical_menu`:
   * 
   * * The options object can contain:
   *   * `back : function() { }` - add a 'back' button, with the function called when it is pressed
   *   * (Bangle.js 2) `scroll : int` - an integer specifying how much the initial menu should be scrolled by
   * * The object returned by `E.showMenu` contains:
   *   * (Bangle.js 2) `scroller` - the object returned by `E.showScroller` - `scroller.scroll` returns the amount the menu is currently scrolled by
   * * In the object specified for editable numbers:
   *   * (Bangle.js 2) the `format` function is called with `format(value)` in the main menu, `format(value,1)` when in a scrollable list, or `format(value,2)` when in a popup window.
   * @param menu An object containing name->function mappings to to be used in a menu
   */
  static showMenu(menu: any): any

  /**
   */
  static showMenu(): void

  /**
   */
  static showMenu(): void

  /**
   * Display a menu on the screen, and set up the buttons to navigate through it.
   * 
   * Supply an object containing menu items. When an item is selected, the
   * function it references will be executed. For example:
   * 
   * ```
   * var boolean = false;
   * var number = 50;
   * // First menu
   * var mainmenu = {
   *   "" : { "title" : "-- Main Menu --" },
   *   "Backlight On" : function() { LED1.set(); },
   *   "Backlight Off" : function() { LED1.reset(); },
   *   "Submenu" : function() { E.showMenu(submenu); },
   *   "A Boolean" : {
   *     value : boolean,
   *     format : v => v?"On":"Off",
   *     onchange : v => { boolean=v; }
   *   },
   *   "A Number" : {
   *     value : number,
   *     min:0,max:100,step:10,
   *     onchange : v => { number=v; }
   *   },
   *   "Exit" : function() { E.showMenu(); }, // remove the menu
   * };
   * // Submenu
   * var submenu = {
   *   "" : { title : "-- SubMenu --",
   *          back : function() { E.showMenu(mainmenu); } },
   *   "One" : undefined, // do nothing
   *   "Two" : undefined // do nothing
   * };
   * // Actually display the menu
   * E.showMenu(mainmenu);
   * ```
   * 
   * The menu will stay onscreen and active until explicitly removed,
   * which you can do by calling `E.showMenu()` without arguments.
   * 
   * See http://www.espruino.com/graphical_menu for more detailed information.
   * @param menu An object containing name->function mappings to to be used in a menu
   */
  static showMenu(menu: any): any

  /**
   * A utility function for displaying a full screen message on the screen.
   * 
   * Draws to the screen and returns immediately.
   * 
   * ```
   * E.showMessage("These are\nLots of\nLines","My Title")
   * ```
   * 
   * or to display an image as well as text:
   * 
   * ```
   * E.showMessage("Lots of text will wrap automatically",{
   *   title:"Warning",
   *   img:atob("FBQBAfgAf+Af/4P//D+fx/n+f5/v+f//n//5//+f//n////3//5/n+P//D//wf/4B/4AH4A=")
   * })
   * ```
   * @param message A message to display. Can include newlines
   * @param options (optional) a title for the message, or an object of options `{title:string, img:image_string}`
   */
  static showMessage(message: any, options: any): void

  /**
   * A utility function for displaying a full screen message on the screen.
   * 
   * Draws to the screen and returns immediately.
   * 
   * ```
   * E.showMessage("These are\nLots of\nLines","My Title")
   * ```
   * @param message A message to display. Can include newlines
   * @param title (optional) a title for the message
   */
  static showMessage(message: any, title: any): void

  /**
   * Displays a full screen prompt on the screen, with the buttons
   * requested (or `Yes` and `No` for defaults).
   * 
   * When the button is pressed the promise is resolved with the
   * requested values (for the `Yes` and `No` defaults, `true` and `false`
   * are returned).
   * 
   * ```
   * E.showPrompt("Do you like fish?").then(function(v) {
   *   if (v) print("'Yes' chosen");
   *   else print("'No' chosen");
   * });
   * // Or
   * E.showPrompt("How many fish\ndo you like?",{
   *   title:"Fish",
   *   buttons : {"One":1,"Two":2,"Three":3}
   * }).then(function(v) {
   *   print("You like "+v+" fish");
   * });
   * // Or
   * E.showPrompt("Continue?", {
   *   title:"Alert",
   *   img:atob("FBQBAfgAf+Af/4P//D+fx/n+f5/v+f//n//5//+f//n////3//5/n+P//D//wf/4B/4AH4A=")}).then(function(v) {
   *   if (v) print("'Yes' chosen");
   *   else print("'No' chosen");
   * });
   * ```
   * 
   * To remove the prompt, call `E.showPrompt()` with no arguments.
   * 
   * The second `options` argument can contain:
   * 
   * ```
   * {
   *   title: "Hello",                       // optional Title
   *   buttons : {"Ok":true,"Cancel":false}, // optional list of button text & return value
   *   img: "image_string"                   // optional image string to draw
   * }
   * ```
   * @param message A message to display. Can include newlines
   * @param options (optional) an object of options (see below)
   */
  static showPrompt(message: any, options: any): any

  /**
   */
  static showPrompt(): void

  /**
   * Displays a full screen prompt on the screen, with the buttons
   * requested (or `Yes` and `No` for defaults).
   * 
   * When the button is pressed the promise is resolved with the
   * requested values (for the `Yes` and `No` defaults, `true` and `false`
   * are returned).
   * 
   * ```
   * E.showPrompt("Do you like fish?").then(function(v) {
   *   if (v) print("'Yes' chosen");
   *   else print("'No' chosen");
   * });
   * // Or
   * E.showPrompt("How many fish\ndo you like?",{
   *   title:"Fish",
   *   buttons : {"One":1,"Two":2,"Three":3}
   * }).then(function(v) {
   *   print("You like "+v+" fish");
   * });
   * ```
   * 
   * To remove the prompt, call `E.showPrompt()` with no arguments.
   * 
   * The second `options` argument can contain:
   * 
   * ```
   * {
   *   title: "Hello",                      // optional Title
   *   buttons : {"Ok":true,"Cancel":false} // list of button text & return value
   * }
   * ```
   * @param message A message to display. Can include newlines
   * @param options (optional) an object of options (see below)
   */
  static showPrompt(message: any, options: any): any

  /**
   * Display a scrollable menu on the screen, and set up the buttons/touchscreen to navigate through it
   * and select items.
   * 
   * Supply an object containing:
   * 
   * ```
   * {
   *   h : 24, // height of each menu item in pixels
   *   c : 10, // number of menu items
   *   // a function to draw a menu item
   *   draw : function(idx, rect) { ... }
   *   // a function to call when the item is selected
   *   select : function(idx) { ... }
   *   // optional function to be called when 'back' is tapped
   *   back : function() { ...}
   * }
   * ```
   * 
   * For example to display a list of numbers:
   * 
   * ```
   * E.showScroller({
   *   h : 40, c : 8,
   *   draw : (idx, r) => {
   *     g.setBgColor((idx&1)?"#666":"#999").clearRect(r.x,r.y,r.x+r.w-1,r.y+r.h-1);
   *     g.setFont("6x8:2").drawString("Item Number\n"+idx,r.x+10,r.y+4);
   *   },
   *   select : (idx) => console.log("You selected ", idx)
   * });
   * ```
   * 
   * To remove the scroller, just call `E.showScroller()`
   * @param options An object containing `{ h, c, draw, select }` (see below) 
   */
  static showScroller(options: any): any

  /**
   */
  static showScroller(): void

  /**
   * Set the seed for the random number generator used by `Math.random()`.
   * @param v The 32 bit integer seed to use for the random number generator
   */
  static srand(v: number): void

  /**
   * Sum the contents of the given Array, String or ArrayBuffer and return the result
   * @param arr The array to sum
   */
  static sum(arr: any): number

  /**
   * Create an ArrayBuffer from the given string. This is done via a reference, not a copy - so it is very fast and memory efficient.
   * 
   * Note that this is an ArrayBuffer, not a Uint8Array. To get one of those, do: `new Uint8Array(E.toArrayBuffer('....'))`.
   * @param str The string to convert to an ArrayBuffer
   */
  static toArrayBuffer(str: any): ArrayBufferView

  /**
   * This performs the same basic function as `JSON.stringify`,
   * however `JSON.stringify` adds extra characters to conform
   * to the JSON spec which aren't required if outputting JS.
   * 
   * `E.toJS` will also stringify JS functions, whereas
   * `JSON.stringify` ignores them.
   * 
   * For example:
   * 
   * * `JSON.stringify({a:1,b:2}) == '{"a":1,"b":2}'`
   * * `E.toJS({a:1,b:2}) == '{a:1,b:2}'`
   * 
   * **Note:** Strings generated with `E.toJS` can't be
   * reliably parsed by `JSON.parse` - however they are
   * valid JS so will work with `eval` (but this has security
   * implications if you don't trust the source of the string).
   * 
   * On the desktop [JSON5 parsers](https://github.com/json5/json5)
   * will parse the strings produced by `E.toJS` without trouble.
   * @param arg The JS variable to convert to a string
   */
  static toJS(arg: any): String

  /**
   * Returns a 'flat' string representing the data in the arguments, or return `undefined`
   * if a flat string cannot be created.
   * 
   * This creates a string from the given arguments. If an argument is a String or an Array,
   * each element is traversed and added as an 8 bit character. If it is anything else, it is
   * converted to a character directly.
   * 
   * In the case where there's one argument which is an 8 bit typed array backed by a
   * flat string of the same length, the backing string will be returned without doing
   * a copy or other allocation. The same applies if there's a single argument which
   * is itself a flat string.
   * @param args The arguments to convert to a String
   */
  static toString(args: JsVarArray): String

  /**
   * This creates a Uint8Array from the given arguments. These are handled as follows:
   * 
   *  * `Number` -> read as an integer, using the lowest 8 bits
   *  * `String` -> use each character's numeric value (eg. `String.charCodeAt(...)`)
   *  * `Array` -> Call itself on each element
   *  * `ArrayBuffer` or Typed Array -> use the lowest 8 bits of each element
   *  * `Object`:
   *    * `{data:..., count: int}` -> call itself `object.count` times, on `object.data`
   *    * `{callback : function}` -> call the given function, call itself on return value
   * 
   * For example:
   * 
   * ```
   * E.toUint8Array([1,2,3])
   * =new Uint8Array([1, 2, 3])
   * E.toUint8Array([1,{data:2,count:3},3])
   * =new Uint8Array([1, 2, 2, 2, 3])
   * E.toUint8Array("Hello")
   * =new Uint8Array([72, 101, 108, 108, 111])
   * E.toUint8Array(["hi",{callback:function() { return [1,2,3] }}])
   * =new Uint8Array([104, 105, 1, 2, 3])
   * ```
   * @param args The arguments to convert to a Uint8Array
   */
  static toUint8Array(args: JsVarArray): Uint8Array

  /**
   * Unmount the SD card, so it can be removed. If you remove the SD card without calling this you may cause corruption, and you will be unable to access another SD card until you reset Espruino or call `E.unmountSD()`.
   */
  static unmountSD(): void

  /**
   * Work out the variance of the contents of the given Array, String or ArrayBuffer and return the result. This is equivalent to `v=0;for (i in arr) v+=Math.pow(mean-arr[i],2)`
   * @param arr The array to work out the variance for
   * @param mean The mean value of the array
   */
  static variance(arr: any, mean: number): number
}

/**
 * An Object that contains functions for writing to the interactive console
 */
class console {
  /**
   * Print the supplied string(s) to the console
   * 
   *  **Note:** If you're connected to a computer (not a wall adaptor) via USB but **you are not running a terminal app** then when you print data Espruino may pause execution and wait until the computer requests the data it is trying to print.
   * @param text One or more arguments to print
   */
  static log(text: JsVarArray): void
}

/**
 * An Object that handles conversion to and from the JSON data interchange format
 */
class JSON {
  /**
   * Parse the given JSON string into a JavaScript object
   * 
   * NOTE: This implementation uses eval() internally, and as such it is unsafe as it can allow arbitrary JS commands to be executed.
   * @param string A JSON string
   */
  static parse(string: any): any

  /**
   * Convert the given object into a JSON string which can subsequently be parsed with JSON.parse or eval.
   * 
   * **Note:** This differs from JavaScript's standard `JSON.stringify` in that:
   * 
   * * The `replacer` argument is ignored
   * * Typed arrays like `new Uint8Array(5)` will be dumped as if they were arrays, not as if they were objects (since it is more compact)
   * @param data The data to be converted to a JSON string
   * @param replacer This value is ignored
   * @param space The number of spaces to use for padding, a string, or null/undefined for no whitespace 
   */
  static stringify(data: any, replacer: any, space: any): any
}

/**
 * Built-in class that caches the modules used by the `require` command
 */
class Modules {
  /**
   * Add the given module to the cache
   * @param id The module name to add
   * @param sourcecode The module's sourcecode
   */
  static addCached(id: any, sourcecode: any): void

  /**
   * Return an array of module names that have been cached
   */
  static getCached(): any

  /**
   * Remove all cached modules
   */
  static removeAllCached(): void

  /**
   * Remove the given module from the list of cached modules
   * @param id The module name to remove
   */
  static removeCached(id: any): void
}

/**
 * This is the built-in JavaScript class for numbers.
 */
class Number {
  /**
   */
  static MAX_VALUE: number

  /**
   */
  static MIN_VALUE: number

  /**
   */
  static NaN: number

  /**
   */
  static NEGATIVE_INFINITY: number

  /**
   */
  static POSITIVE_INFINITY: number

  /**
   * Creates a number
   * @param value A single value to be converted to a number
   */
  constructor(value: JsVarArray)

  /**
   * Format the number as a fixed point number
   * @param decimalPlaces A number between 0 and 20 specifying the number of decimal digits after the decimal point
   */
  toFixed(decimalPlaces: int32): any
}

/**
 * This is the built-in class for Objects
 */
class Object {
  /**
   * Find the length of the object
   */
  length: any

  /**
   * Creates an Object from the supplied argument
   * @param value A single value to be converted to an object
   */
  constructor(value: any)

  /**
   * Copy this object completely
   */
  clone(): any

  /**
   * Call any event listeners that were added to this object with `Object.on`, for instance `obj.emit('data', 'Foo')`.
   * 
   * For more information see `Object.on`
   * @param event The name of the event, for instance 'data'
   * @param args Optional arguments
   */
  emit(event: any, args: JsVarArray): void

  /**
   * Return true if the object (not its prototype) has the given property.
   * 
   * NOTE: This currently returns false-positives for built-in functions in prototypes
   * @param name The name of the property to search for
   */
  hasOwnProperty(name: any): boolean

  /**
   * Register an event listener for this object, for instance `Serial1.on('data', function(d) {...})`.
   * 
   * This is the same as Node.js's [EventEmitter](https://nodejs.org/api/events.html) but on Espruino
   * the functionality is built into every object:
   * 
   * * `Object.on`
   * * `Object.emit`
   * * `Object.removeListener`
   * * `Object.removeAllListeners`
   * 
   * ```
   * var o = {}; // o can be any object...
   * // call an arrow function when the 'answer' event is received
   * o.on('answer', x => console.log(x));
   * // call a named function when the 'answer' event is received
   * function printAnswer(d) {
   *   console.log("The answer is", d);
   * }
   * o.on('answer', printAnswer);
   * // emit the 'answer' event - functions added with 'on' will be executed
   * o.emit('answer', 42);
   * // prints: 42
   * // prints: The answer is 42
   * // If you have a named function, it can be removed by name
   * o.removeListener('answer', printAnswer);
   * // Now 'printAnswer' is removed
   * o.emit('answer', 43);
   * // prints: 43
   * // Or you can remove all listeners for 'answer'
   * o.removeAllListeners('answer')
   * // Now nothing happens
   * o.emit('answer', 44);
   * // nothing printed
   * ```
   * @param event The name of the event, for instance 'data'
   * @param listener The listener to call when this event is received
   */
  on(event: any, listener: any): void

  /**
   * Removes all listeners (if `event===undefined`), or those of the specified event.
   * 
   * ```
   * Serial1.on("data", function(data) { ... });
   * Serial1.removeAllListeners("data");
   * // or
   * Serial1.removeAllListeners(); // removes all listeners for all event types
   * ```
   * 
   * For more information see `Object.on`
   * @param event The name of the event, for instance `'data'`. If not specified *all* listeners are removed.
   */
  removeAllListeners(event: any): void

  /**
   * Removes the specified event listener.
   * 
   * ```
   * function foo(d) {
   *   console.log(d);
   * }
   * Serial1.on("data", foo);
   * Serial1.removeListener("data", foo);
   * ```
   * 
   * For more information see `Object.on`
   * @param event The name of the event, for instance 'data'
   * @param listener The listener to remove
   */
  removeListener(event: any, listener: any): void

  /**
   * Convert the Object to a string
   * @param radix If the object is an integer, the radix (between 2 and 36) to use. NOTE: Setting a radix does not work on floating point numbers.
   */
  toString(radix: any): any

  /**
   * Returns the primitive value of this object.
   */
  valueOf(): any

  /**
   * Appends all keys and values in any subsequent objects to the first object
   * 
   * **Note:** Unlike the standard ES6 `Object.assign`, this will throw an exception
   * if given raw strings, bools or numbers rather than objects.
   * @param args The target object, then any items objects to use as sources of keys
   */
  static assign(args: JsVarArray): any

  /**
   * Creates a new object with the specified prototype object and properties. properties are currently unsupported.
   * @param proto A prototype object
   * @param propertiesObject An object containing properties. NOT IMPLEMENTED
   */
  static create(proto: any, propertiesObject: any): any

  /**
   * Adds new properties to the Object. See `Object.defineProperty` for more information
   * @param obj An object
   * @param props An object whose fields represent property names, and whose values are property descriptors.
   */
  static defineProperties(obj: any, props: any): any

  /**
   * Add a new property to the Object. 'Desc' is an object with the following fields:
   * 
   * * `configurable` (bool = false) - can this property be changed/deleted (not implemented)
   * * `enumerable` (bool = false) - can this property be enumerated (not implemented)
   * * `value` (anything) - the value of this property
   * * `writable` (bool = false) - can the value be changed with the assignment operator? (not implemented)
   * * `get` (function) - the getter function, or undefined if no getter (only supported on some platforms)
   * * `set` (function) - the setter function, or undefined if no setter (only supported on some platforms)
   * 
   * **Note:** `configurable`, `enumerable` and `writable` are not implemented and will be ignored.
   * @param obj An object
   * @param name The name of the property
   * @param desc The property descriptor
   */
  static defineProperty(obj: any, name: any, desc: any): any

  /**
   * Get information on the given property in the object, or undefined
   * @param obj The object
   * @param name The name of the property
   */
  static getOwnPropertyDescriptor(obj: any, name: any): any

  /**
   * Returns an array of all properties (enumerable or not) found directly on a given object.
   * @param object The Object to return a list of property names for
   */
  static getOwnPropertyNames(object: any): any

  /**
   * Get the prototype of the given object - this is like writing `object.__proto__`
   * but is the 'proper' ES6 way of doing it
   * @param object An object
   */
  static getPrototypeOf(object: any): any

  /**
   * Return all enumerable keys of the given object
   * @param object The object to return keys for
   */
  static keys(object: any): any

  /**
   * Set the prototype of the given object - this is like writing
   * `object.__proto__ = prototype` but is the 'proper' ES6 way of doing it
   * @param object An object
   * @param prototype The prototype to set on the object
   */
  static setPrototypeOf(object: any, prototype: any): any
}

/**
 * This is the built-in class for Functions
 */
class Function {
  /**
   * Creates a function
   * @param args Zero or more arguments (as strings), followed by a string representing the code to run
   */
  constructor(args: JsVarArray)

  /**
   * This executes the function with the supplied 'this' argument and parameters
   * @param this The value to use as the 'this' argument when executing the function
   * @param args Optional Array of Arguments
   */
  apply(this: any, args: any): any

  /**
   * This executes the function with the supplied 'this' argument and parameters
   * @param this The value to use as the 'this' argument when executing the function
   * @param params Optional Default parameters that are prepended to the call
   */
  bind(this: any, params: JsVarArray): any

  /**
   * This executes the function with the supplied 'this' argument and parameters
   * @param this The value to use as the 'this' argument when executing the function
   * @param params Optional Parameters
   */
  call(this: any, params: JsVarArray): any

  /**
   * This replaces the function with the one in the argument - while keeping the old function's scope.
   * This allows inner functions to be edited, and is used when edit() is called on an inner function.
   * @param newFunc The new function to replace this function with
   */
  replaceWith(newFunc: any): void
}

/**
 * This class provides a software-defined OneWire master. It is designed to be similar to Arduino's OneWire library.
 */
class OneWire {
  /**
   * Create a software OneWire implementation on the given pin
   * @param pin The pin to implement OneWire on
   */
  constructor(pin: Pin)

  /**
   * Read a byte
   * @param count (optional) The amount of bytes to read
   */
  read(count: any): any

  /**
   * Perform a reset cycle
   */
  reset(): boolean

  /**
   * Search for devices
   * @param command (Optional) command byte. If not specified (or zero), this defaults to 0xF0. This can could be set to 0xEC to perform a DS18B20 'Alarm Search Command'
   */
  search(command: int32): any

  /**
   * Select a ROM - always performs a reset first
   * @param rom The device to select (get this using `OneWire.search()`)
   */
  select(rom: any): void

  /**
   * Skip a ROM
   */
  skip(): void

  /**
   * Write one or more bytes
   * @param data A byte (or array of bytes) to write
   * @param power Whether to leave power on after write (default is false)
   */
  write(data: any, power: boolean): void
}

/**
 * This is the built-in class for Pins, such as D0,D1,LED1, or BTN
 * 
 * You can call the methods on Pin, or you can use Wiring-style functions such as digitalWrite
 */
class Pin {
  /**
   * Creates a pin from the given argument (or returns undefined if no argument)
   * @param value A value to be converted to a pin. Can be a number, pin, or String.
   */
  constructor(value: any)

  /**
   * Get information about this pin and its capabilities. Of the form:
   * 
   * ```
   * {
   *   "port"      : "A", // the Pin's port on the chip
   *   "num"       : 12, // the Pin's number
   *   "in_addr"   : 0x..., // (if available) the address of the pin's input address in bit-banded memory (can be used with peek)
   *   "out_addr"  : 0x..., // (if available) the address of the pin's output address in bit-banded memory (can be used with poke)
   *   "analog"    : { ADCs : [1], channel : 12 }, // If analog input is available
   *   "functions" : {
   *     "TIM1":{type:"CH1, af:0},
   *     "I2C3":{type:"SCL", af:1}
   *   }
   * }
   * ```
   * Will return undefined if pin is not valid.
   */
  getInfo(): any

  /**
   * Return the current mode of the given pin. See `pinMode` for more information.
   */
  getMode(): any

  /**
   * Set the mode of the given pin. See [`pinMode`](#l__global_pinMode) for more information on pin modes.
   * @param mode The mode - a string that is either 'analog', 'input', 'input_pullup', 'input_pulldown', 'output', 'opendrain', 'af_output' or 'af_opendrain'. Do not include this argument if you want to revert to automatic pin mode setting.
   */
  mode(mode: any): void

  /**
   * Returns the input state of the pin as a boolean.
   * 
   *  **Note:** if you didn't call `pinMode` beforehand then this function will also reset the pin's state to `"input"`
   */
  read(): boolean

  /**
   * Sets the output state of the pin to a 0
   * 
   *  **Note:** if you didn't call `pinMode` beforehand then this function will also reset the pin's state to `"output"`
   */
  reset(): void

  /**
   * Sets the output state of the pin to a 1
   * 
   *  **Note:** if you didn't call `pinMode` beforehand then this function will also reset the pin's state to `"output"`
   */
  set(): void

  /**
   * Toggles the state of the pin from off to on, or from on to off.
   * 
   * **Note:** This method doesn't currently work on the ESP8266 port of Espruino.
   * 
   * **Note:** if you didn't call `pinMode` beforehand then this function will also reset the pin's state to `"output"`
   */
  toggle(): boolean

  /**
   * Sets the output state of the pin to the parameter given
   * 
   *  **Note:** if you didn't call `pinMode` beforehand then this function will also reset the pin's state to `"output"`
   * @param value Whether to set output high (true/1) or low (false/0)
   */
  write(value: boolean): void

  /**
   * Sets the output state of the pin to the parameter given at the specified time.
   * 
   *  **Note:** this **doesn't** change the mode of the pin to an output. To do that, you need to use `pin.write(0)` or `pinMode(pin, 'output')` first.
   * @param value Whether to set output high (true/1) or low (false/0)
   * @param time Time at which to write
   */
  writeAtTime(value: boolean, time: number): void
}

/**
 * This class contains information about Espruino itself
 */
class process {
  /**
   * Returns an Object containing various pre-defined variables. standard ones are BOARD, VERSION, FLASH, RAM, MODULES.
   * 
   * For example, to get a list of built-in modules, you can use `process.env.MODULES.split(',')`
   */
  static env: any

  /**
   * Returns the version of Espruino as a String
   */
  static version: any

  /**
   * This event is called when an exception gets thrown and isn't caught (eg. it gets all the way back to the event loop).
   * 
   * You can use this for logging potential problems that might occur during execution when you
   * might not be able to see what is written to the console, for example:
   * 
   * ```
   * var lastError;
   * process.on('uncaughtException', function(e) {
   *   lastError=e;
   *   print(e,e.stack?"\n"+e.stack:"")
   * });
   * function checkError() {
   *   if (!lastError) return print("No Error");
   *   print(lastError,lastError.stack?"\n"+lastError.stack:"")
   * }
   * ```
   * 
   * **Note:** When this is used, exceptions will cease to be reported on the console - which
   * may make debugging difficult!
   * @param exception The uncaught exception
   */
  on(event:'uncaughtException', callback: (exception: any) => void): void

  /**
   * Run a Garbage Collection pass, and return an object containing information on memory usage.
   * 
   * * `free`  : Memory that is available to be used (in blocks)
   * * `usage` : Memory that has been used (in blocks)
   * * `total` : Total memory (in blocks)
   * * `history` : Memory used for command history - that is freed if memory is low. Note that this is INCLUDED in the figure for 'free'
   * * `gc`      : Memory freed during the GC pass
   * * `gctime`  : Time taken for GC pass (in milliseconds)
   * * `blocksize` : Size of a block (variable) in bytes
   * * `stackEndAddress` : (on ARM) the address (that can be used with peek/poke/etc) of the END of the stack. The stack grows down, so unless you do a lot of recursion the bytes above this can be used.
   * * `flash_start`      : (on ARM) the address of the start of flash memory (usually `0x8000000`)
   * * `flash_binary_end` : (on ARM) the address in flash memory of the end of Espruino's firmware.
   * * `flash_code_start` : (on ARM) the address in flash memory of pages that store any code that you save with `save()`.
   * * `flash_length` : (on ARM) the amount of flash memory this firmware was built for (in bytes). **Note:** Some STM32 chips actually have more memory than is advertised.
   * 
   * Memory units are specified in 'blocks', which are around 16 bytes each (depending on your device). The actual size is available in `blocksize`. See http://www.espruino.com/Performance for more information.
   * 
   * **Note:** To find free areas of flash memory, see `require('Flash').getFree()`
   * @param gc An optional boolean. If `undefined` or `true` Garbage collection is performed, if `false` it is not
   */
  static memory(gc: any): any
}

/**
 * This is the built-in class for ES6 Promises
 */
class Promise {
  /**
   * Create a new Promise. The executor function is executed immediately (before the constructor even returns)
   * and
   * @param executor A function of the form `function (resolve, reject)`
   */
  constructor(executor: any)

  /**
   * @param onRejected A callback that is called when this promise is rejected
   */
  catch(onRejected: any): any

  /**
   * @param onFulfilled A callback that is called when this promise is resolved
   * @param onRejected A callback that is called when this promise is rejected (or nothing)
   */
  then(onFulfilled: any, onRejected: any): any

  /**
   * Return a new promise that is resolved when all promises in the supplied
   * array are resolved.
   * @param promises An array of promises
   */
  static all(promises: any): any

  /**
   * Return a new promise that is already rejected (at idle it'll
   * call `.catch`)
   * @param promises Data to pass to the `.catch` handler
   */
  static reject(promises: any): any

  /**
   * Return a new promise that is already resolved (at idle it'll
   * call `.then`)
   * @param promises Data to pass to the `.then` handler
   */
  static resolve(promises: any): any
}

/**
 * The built-in class for handling Regular Expressions
 * 
 * **Note:** Espruino's regular expression parser does not contain all the features
 * present in a full ES6 JS engine. However it does contain support for the all the basics.
 */
class RegExp {
  /**
   * Creates a RegExp object, for handling Regular Expressions
   * @param regex A regular expression as a string
   * @param regex Flags for the regular expression as a string
   */
  constructor(regex: any, regex: any)

  /**
   * Test this regex on a string - returns a result array on success, or `null` otherwise.
   * 
   * 
   * `/Wo/.exec("Hello World")` will return:
   * 
   * ```
   * [
   *  "Wo",
   *  "index": 6,
   *  "input": "Hello World"
   * ]
   * ```
   * 
   * Or with groups `/W(o)rld/.exec("Hello World")` returns:
   * 
   * ```
   * [
   *  "World",
   *  "o", "index": 6,
   *  "input": "Hello World"
   * ]
   * ```
   * @param str A string to match on
   */
  exec(str: any): any

  /**
   * Test this regex on a string - returns `true` on a successful match, or `false` otherwise
   * @param str A string to match on
   */
  test(str: any): boolean
}

/**
 * This class allows use of the built-in USARTs
 * 
 * Methods may be called on the `USB`, `Serial1`, `Serial2`, `Serial3`, `Serial4`, `Serial5` and `Serial6` objects. While different processors provide different numbers of USARTs, on official Espruino boards you can always rely on at least `Serial1` being available
 */
class Serial {
  /**
   * Create a software Serial port. This has limited functionality (only low baud rates), but it can work on any pins.
   * 
   * Use `Serial.setup` to configure this port.
   */
  constructor()

  /**
   * The `data` event is called when data is received. If a handler is defined with `X.on('data', function(data) { ... })` then it will be called, otherwise data will be stored in an internal buffer, where it can be retrieved with `X.read()`
   * @param data A string containing one or more characters of received data
   */
  on(event: 'data', callback: (data: string) => void): void

  /**
   * The `framing` event is called when there was activity on the input to the UART
   * but the `STOP` bit wasn't in the correct place. This is either because there
   * was noise on the line, or the line has been pulled to 0 for a long period
   * of time.
   * 
   * To enable this, you must initialise Serial with `SerialX.setup(..., { ..., errors:true });`
   * 
   * **Note:** Even though there was an error, the byte will still be received and
   * passed to the `data` handler.
   * 
   * **Note:** This only works on STM32 and NRF52 based devices (eg. all official Espruino boards)
   */
  on(event: 'framing', callback: () => void): void

  /**
   * The `parity` event is called when the UART was configured with a parity bit,
   * and this doesn't match the bits that have actually been received.
   * 
   * To enable this, you must initialise Serial with `SerialX.setup(..., { ..., errors:true });`
   * 
   * **Note:** Even though there was an error, the byte will still be received and
   * passed to the `data` handler.
   * 
   * **Note:** This only works on STM32 and NRF52 based devices (eg. all official Espruino boards)
   */
  on(event: 'parity', callback: () => void): void

  /**
   * Return how many bytes are available to read. If there is already a listener for data, this will always return 0.
   */
  available(): number

  /**
   * Add data to this device as if it came directly from the input - it will be
   * returned via `serial.on('data', ...)`;
   * 
   * ```
   * Serial1.on('data', function(d) { print("Got",d); });
   * Serial1.inject('Hello World');
   * // prints "Got Hel","Got lo World" (characters can be split over multiple callbacks)
   * ```
   * 
   * This is most useful if you wish to send characters to Espruino's
   * REPL (console) while it is on another device.
   * @param data One or more items to write. May be ints, strings, arrays, or special objects (see `E.toUint8Array` for more info).
   */
  inject(data: JsVarArray): void

  /**
   * Pipe this USART to a stream (an object with a 'write' method)
   * @param destination The destination file/stream that will receive content from the source.
   * @param options An optional object `{ chunkSize : int=32, end : bool=true, complete : function }`,chunkSize : The amount of data to pipe from source to destination at a time,complete : a function to call when the pipe activity is complete,end : call the 'end' function on the destination when the source is finished
   */
  pipe(destination: any, options: any): void

  /**
   * Print a string to the serial port - without a line feed
   * 
   *  **Note:** This function replaces any occurances of `\n` in the string with `\r\n`. To avoid this, use `Serial.write`.
   * @param string A String to print
   */
  print(string: any): void

  /**
   * Print a line to the serial port with a newline (`\r\n`) at the end of it.
   * 
   *  **Note:** This function converts data to a string first, eg `Serial.print([1,2,3])` is equivalent to `Serial.print("1,2,3"). If you'd like to write raw bytes, use `Serial.write`.
   * @param string A String to print
   */
  println(string: any): void

  /**
   * Return a string containing characters that have been received
   * @param chars The number of characters to read, or undefined/0 for all available
   */
  read(chars: number): any

  /**
   * Set this Serial port as the port for the JavaScript console (REPL).
   * 
   * Unless `force` is set to true, changes in the connection state of the board
   * (for instance plugging in USB) will cause the console to change.
   * 
   * See `E.setConsole` for a more flexible version of this function.
   * @param force Whether to force the console to this port
   */
  setConsole(force: boolean): void

  /**
   * Setup this Serial port with the given baud rate and options.
   * 
   * eg.
   * 
   * ```
   * Serial1.setup(9600,{rx:a_pin, tx:a_pin});
   * ```
   * 
   * The second argument can contain:
   * 
   * ```
   * {
   *   rx:pin,                           // Receive pin (data in to Espruino)
   *   tx:pin,                           // Transmit pin (data out of Espruino)
   *   ck:pin,                           // (default none) Clock Pin
   *   cts:pin,                          // (default none) Clear to Send Pin
   *   bytesize:8,                       // (default 8)How many data bits - 7 or 8
   *   parity:null/'none'/'o'/'odd'/'e'/'even',
   *                                     // (default none) Parity bit
   *   stopbits:1,                       // (default 1) Number of stop bits to use
   *   flow:null/undefined/'none'/'xon', // (default none) software flow control
   *   path:null/undefined/string        // Linux Only - the path to the Serial device to use
   *   errors:false                      // (default false) whether to forward framing/parity errors
   * }
   * ```
   * 
   * You can find out which pins to use by looking at [your board's reference page](#boards)
   * and searching for pins with the `UART`/`USART` markers.
   * 
   * If not specified in options, the default pins are used for rx and tx
   * (usually the lowest numbered pins on the lowest port that supports
   * this peripheral). `ck` and `cts` are not used unless specified.
   * 
   * Note that even after changing the RX and TX pins, if you have called setup
   * before then the previous RX and TX pins will still be connected to the Serial
   * port as well - until you set them to something else using `digitalWrite` or
   * `pinMode`.
   * 
   * Flow control can be xOn/xOff (`flow:'xon'`) or hardware flow control
   * (receive only) if `cts` is specified. If `cts` is set to a pin, the
   * pin's value will be 0 when Espruino is ready for data and 1 when it isn't.
   * 
   * By default, framing or parity errors don't create `framing` or `parity` events
   * on the `Serial` object because storing these errors uses up additional
   * storage in the queue. If you're intending to receive a lot of malformed
   * data then the queue might overflow `E.getErrorFlags()` would return `FIFO_FULL`.
   * However if you need to respond to `framing` or `parity` errors then
   * you'll need to use `errors:true` when initialising serial.
   * 
   * On Linux builds there is no default Serial device, so you must specify
   * a path to a device - for instance: `Serial1.setup(9600,{path:"/dev/ttyACM0"})`
   * 
   * You can also set up 'software serial' using code like:
   * 
   * ```
   * var s = new Serial();
   * s.setup(9600,{rx:a_pin, tx:a_pin});
   * ```
   * 
   * However software serial doesn't use `ck`, `cts`, `parity`, `flow` or `errors` parts of the initialisation object.
   * @param baudrate The baud rate - the default is 9600
   * @param options An optional structure containing extra information on initialising the serial port - see below.
   */
  setup(baudrate: any, options: any): void

  /**
   * If the serial (or software serial) device was set up,
   * uninitialise it.
   */
  unsetup(): void

  /**
   * Write a character or array of data to the serial port
   * 
   * This method writes unmodified data, eg `Serial.write([1,2,3])` is equivalent to `Serial.write("\1\2\3")`. If you'd like data converted to a string first, use `Serial.print`.
   * @param data One or more items to write. May be ints, strings, arrays, or special objects (see `E.toUint8Array` for more info).
   */
  write(data: JsVarArray): void

  /**
   * Try and find a USART (Serial) hardware device that will work on this pin (eg. `Serial1`)
   * 
   * May return undefined if no device can be found.
   * @param pin A pin to search with
   */
  static find(pin: Pin): any
}

/**
 * This class allows use of the built-in SPI ports. Currently it is SPI master only.
 */
class SPI {
  /**
   * Create a software SPI port. This has limited functionality (no baud rate), but it can work on any pins.
   * 
   * Use `SPI.setup` to configure this port.
   */
  constructor()

  /**
   * Send data down SPI, and return the result. Sending an integer will return an integer, a String will return a String, and anything else will return a Uint8Array.
   * 
   * Sending multiple bytes in one call to send is preferable as they can then be transmitted end to end. Using multiple calls to send() will result in significantly slower transmission speeds.
   * 
   * For maximum speeds, please pass either Strings or Typed Arrays as arguments. Note that you can even pass arrays of arrays, like `[1,[2,3,4],5]`
   * @param data The data to send - either an Integer, Array, String, or Object of the form `{data: ..., count:#}`
   * @param nss_pin An nSS pin - this will be lowered before SPI output and raised afterwards (optional). There will be a small delay between when this is lowered and when sending starts, and also between sending finishing and it being raised.
   */
  send(data: any, nss_pin: Pin): any

  /**
   * Send data down SPI, using 4 bits for each 'real' bit (MSB first). This can be useful for faking one-wire style protocols
   * 
   * Sending multiple bytes in one call to send is preferable as they can then be transmitted end to end. Using multiple calls to send() will result in significantly slower transmission speeds.
   * @param data The data to send - either an integer, array, or string
   * @param bit0 The 4 bits to send for a 0 (MSB first)
   * @param bit1 The 4 bits to send for a 1 (MSB first)
   * @param nss_pin An nSS pin - this will be lowered before SPI output and raised afterwards (optional). There will be a small delay between when this is lowered and when sending starts, and also between sending finishing and it being raised.
   */
  send4bit(data: any, bit0: int32, bit1: int32, nss_pin: Pin): void

  /**
   * Send data down SPI, using 8 bits for each 'real' bit (MSB first). This can be useful for faking one-wire style protocols
   * 
   * Sending multiple bytes in one call to send is preferable as they can then be transmitted end to end. Using multiple calls to send() will result in significantly slower transmission speeds.
   * @param data The data to send - either an integer, array, or string
   * @param bit0 The 8 bits to send for a 0 (MSB first)
   * @param bit1 The 8 bits to send for a 1 (MSB first)
   * @param nss_pin An nSS pin - this will be lowered before SPI output and raised afterwards (optional). There will be a small delay between when this is lowered and when sending starts, and also between sending finishing and it being raised
   */
  send8bit(data: any, bit0: int32, bit1: int32, nss_pin: Pin): void

  /**
   * Set up this SPI port as an SPI Master.
   * 
   * Options can contain the following (defaults are shown where relevant):
   * 
   * ```
   * {
   *   sck:pin,
   *   miso:pin,
   *   mosi:pin,
   *   baud:integer=100000, // ignored on software SPI
   *   mode:integer=0, // between 0 and 3
   *   order:string='msb' // can be 'msb' or 'lsb'
   *   bits:8 // only available for software SPI
   * }
   * ```
   * 
   * If `sck`,`miso` and `mosi` are left out, they will automatically be chosen. However if one or more is specified then the unspecified pins will not be set up.
   * 
   * You can find out which pins to use by looking at [your board's reference page](#boards) and searching for pins with the `SPI` marker. Some boards such as those based on `nRF52` chips can have SPI on any pins, so don't have specific markings.
   * 
   * The SPI `mode` is between 0 and 3 - see http://en.wikipedia.org/wiki/Serial_Peripheral_Interface_Bus#Clock_polarity_and_phase
   * 
   * On STM32F1-based parts, you cannot mix AF and non-AF pins (SPI pins are usually grouped on the chip - and you can't mix pins from two groups). Espruino will not warn you about this.
   * @param options An Object containing extra information on initialising the SPI port
   */
  setup(options: any): void

  /**
   * Write a character or array of characters to SPI - without reading the result back.
   * 
   * For maximum speeds, please pass either Strings or Typed Arrays as arguments.
   * @param data One or more items to write. May be ints, strings, arrays, or special objects (see `E.toUint8Array` for more info).,If the last argument is a pin, it is taken to be the NSS pin
   */
  write(data: JsVarArray): void

  /**
   * Try and find an SPI hardware device that will work on this pin (eg. `SPI1`)
   * 
   * May return undefined if no device can be found.
   * @param pin A pin to search with
   */
  static find(pin: Pin): any
}

/**
 * This class allows use of the built-in I2C ports. Currently it allows I2C Master mode only.
 * 
 * All addresses are in 7 bit format. If you have an 8 bit address then you need to shift it one bit to the right.
 */
class I2C {
  /**
   * Create a software I2C port. This has limited functionality (no baud rate), but it can work on any pins.
   * 
   * Use `I2C.setup` to configure this port.
   */
  constructor()

  /**
   * Request bytes from the given slave device, and return them as a Uint8Array (packed array of bytes). This is like using Arduino Wire's requestFrom, available and read functions.  Sends a STOP
   * @param address The 7 bit address of the device to request bytes from, or an object of the form `{address:12, stop:false}` to send this data without a STOP signal.
   * @param quantity The number of bytes to request
   */
  readFrom(address: any, quantity: int32): Uint8Array

  /**
   * Set up this I2C port
   * 
   * If not specified in options, the default pins are used (usually the lowest numbered pins on the lowest port that supports this peripheral)
   * @param options An optional structure containing extra information on initialising the I2C port,```{scl:pin, sda:pin, bitrate:100000}```,You can find out which pins to use by looking at [your board's reference page](#boards) and searching for pins with the `I2C` marker. Note that 400kHz is the maximum bitrate for most parts.
   */
  setup(options: any): void

  /**
   * Transmit to the slave device with the given address. This is like Arduino's beginTransmission, write, and endTransmission rolled up into one.
   * @param address The 7 bit address of the device to transmit to, or an object of the form `{address:12, stop:false}` to send this data without a STOP signal.
   * @param data One or more items to write. May be ints, strings, arrays, or special objects (see `E.toUint8Array` for more info).
   */
  writeTo(address: any, data: JsVarArray): void

  /**
   * Try and find an I2C hardware device that will work on this pin (eg. `I2C1`)
   * 
   * May return undefined if no device can be found.
   * @param pin A pin to search with
   */
  static find(pin: Pin): any
}

/**
 * These objects are created from `require("Storage").open`
 * and allow Storage items to be read/written.
 * 
 * The `Storage` library writes into Flash memory (which
 * can only be erased in chunks), and unlike a normal filesystem
 * it allocates files in one long contiguous area to allow them
 * to be accessed easily from Espruino.
 * 
 * This presents a challenge for `StorageFile` which allows you
 * to append to a file, so instead `StorageFile` stores files
 * in chunks. It uses the last character of the filename
 * to denote the chunk number (eg `"foobar\1"`, `"foobar\2"`, etc).
 * 
 * This means that while `StorageFile` files exist in the same
 * area as those from `Storage`, they should be
 * read using `Storage.open` (and not `Storage.read`).
 * 
 * ```
 * f = s.open("foobar","w");
 * f.write("Hell");
 * f.write("o World\n");
 * f.write("Hello\n");
 * f.write("World 2\n");
 * // there's no need to call 'close'
 * // then
 * f = s.open("foobar","r");
 * f.read(13) // "Hello World\nH"
 * f.read(13) // "ello\nWorld 2\n"
 * f.read(13) // "Hello World 3"
 * f.read(13) // "\n"
 * f.read(13) // undefined
 * // or
 * f = s.open("foobar","r");
 * f.readLine() // "Hello World\n"
 * f.readLine() // "Hello\n"
 * f.readLine() // "World 2\n"
 * f.readLine() // "Hello World 3\n"
 * f.readLine() // undefined
 * // now get rid of file
 * f.erase();
 * ```
 * 
 * **Note:** `StorageFile` uses the fact that all bits of erased flash memory
 * are 1 to detect the end of a file. As such you should not write character
 * code 255 (`"\xFF"`) to these files.
 */
class StorageFile {
  /**
   * Erase this file
   */
  erase(): void

  /**
   * Return the length of the current file.
   * 
   * This requires Espruino to read the file from scratch,
   * which is not a fast operation.
   */
  getLength(): number

  /**
   * Read 'len' bytes of data from the file, and return a String containing those bytes.
   * 
   * If the end of the file is reached, the String may be smaller than the amount of bytes
   * requested, or if the file is already at the end, `undefined` is returned.
   * @param len How many bytes to read
   */
  read(len: number): String

  /**
   * Read a line of data from the file (up to and including `"\n"`)
   */
  readLine(): String

  /**
   * Append the given data to a file. You should not attempt to append  `"\xFF"` (character code 255).
   * @param data The data to write. This should not include `'\xFF'` (character code 255)
   */
  write(data: any): void
}

/**
 * This is the built-in class for Text Strings.
 * 
 * Text Strings in Espruino are not zero-terminated, so you can store zeros in them.
 */
class String {
  /**
   * Find the length of the string
   */
  length: any

  /**
   * Create a new String
   * @param str A value to turn into a string. If undefined or not supplied, an empty String is created.
   */
  constructor(str: JsVarArray)

  /**
   * Return a single character at the given position in the String.
   * @param pos The character number in the string. Negative values return characters from end of string (-1 = last char)
   */
  charAt(pos: number): any

  /**
   * Return the integer value of a single character at the given position in the String.
   * 
   * Note that this returns 0 not 'NaN' for out of bounds characters
   * @param pos The character number in the string. Negative values return characters from end of string (-1 = last char)
   */
  charCodeAt(pos: number): int32

  /**
   * Append all arguments to this `String` and return the result. Does not modify the original `String`.
   * @param args Strings to append
   */
  concat(args: JsVarArray): any

  /**
   * @param searchString The string to search for
   * @param length The 'end' of the string - if left off the actual length of the string is used
   */
  endsWith(searchString: any, length: any): boolean

  /**
   * @param substring The string to search for
   * @param fromIndex The start character index (or 0 if not defined)
   */
  includes(substring: any, fromIndex: any): boolean

  /**
   * Return the index of substring in this string, or -1 if not found
   * @param substring The string to search for
   * @param fromIndex Index to search from
   */
  indexOf(substring: any, fromIndex: any): int32

  /**
   * Return the last index of substring in this string, or -1 if not found
   * @param substring The string to search for
   * @param fromIndex Index to search from
   */
  lastIndexOf(substring: any, fromIndex: any): int32

  /**
   * Matches an occurrence `subStr` in the string.
   * 
   * Returns `null` if no match, or:
   * 
   * ```
   * "abcdef".match("b") == [
   *   "b",         // array index 0 - the matched string
   *   index: 1,    // the start index of the match
   *   input: "b"   // the input string
   *  ]
   * "abcdefabcdef".match(/bcd/) == [
   *   "bcd", index: 1,
   *   input: "abcdefabcdef"
   *  ]
   * ```
   * 
   * 'Global' RegEx matches just return an array of matches (with no indices):
   * 
   * ```
   * "abcdefabcdef".match(/bcd/g) = [
   *   "bcd",
   *   "bcd"
   *  ]
   * ```
   * @param substr Substring or RegExp to match
   */
  match(substr: any): any

  /**
   * Pad this string at the end to the required number of characters
   * 
   * ```
   * "Hello".padEnd(10) == "Hello     "
   * "123".padEnd(10,".-") == "123.-.-.-."
   * ```
   * @param targetLength The length to pad this string to
   * @param padString [optional] The string to pad with, default is `' '`
   */
  padEnd(targetLength: number, padString: any): String

  /**
   * Pad this string at the beginnind to the required number of characters
   * 
   * ```
   * "Hello".padStart(10) == "     Hello"
   * "123".padStart(10,".-") == ".-.-.-.123"
   * ```
   * @param targetLength The length to pad this string to
   * @param padString [optional] The string to pad with, default is `' '`
   */
  padStart(targetLength: number, padString: any): String

  /**
   * Repeat this string the given number of times.
   * @param count An integer with the amount of times to repeat this String
   */
  repeat(count: number): String

  /**
   * Search and replace ONE occurrance of `subStr` with `newSubStr` and return the result. This doesn't alter the original string. Regular expressions not supported.
   * @param subStr The string to search for
   * @param newSubStr The string to replace it with
   */
  replace(subStr: any, newSubStr: any): any

  /**
   * @param start The start character index, if negative it is from the end of the string
   * @param end The end character index, if negative it is from the end of the string, and if omitted it is the end of the string
   */
  slice(start: number, end: any): any

  /**
   * Return an array made by splitting this string up by the separator. eg. ```'1,2,3'.split(',')==['1', '2', '3']```
   * 
   * Regular Expressions can also be used to split strings, eg. `'1a2b3 4'.split(/[^0-9]/)==['1', '2', '3', '4']`.
   * @param separator The separator `String` or `RegExp` to use
   */
  split(separator: any): any

  /**
   * @param searchString The string to search for
   * @param position The start character index (or 0 if not defined)
   */
  startsWith(searchString: any, position: number): boolean

  /**
   * @param start The start character index
   * @param len The number of characters
   */
  substr(start: number, len: any): any

  /**
   * @param start The start character index
   * @param end The end character index
   */
  substring(start: number, end: any): any

  /**
   */
  toLowerCase(): any

  /**
   */
  toUpperCase(): any

  /**
   * Return a new string with any whitespace (tabs, space, form feed, newline,
   * carriage return, etc) removed from the beginning and end.
   */
  trim(): String

  /**
   * Return the character(s) represented by the given character code(s).
   * @param code One or more character codes to create a string from (range 0-255).
   */
  static fromCharCode(code: JsVarArray): any
}

/**
 * This class handles waveforms. In Espruino, a Waveform is a set of data that you want to input or output.
 */
class Waveform {
  /**
   * Create a waveform class. This allows high speed input and output of waveforms. It has an internal variable called `buffer` (as well as `buffer2` when double-buffered - see `options` below) which contains the data to input/output.
   * 
   * When double-buffered, a 'buffer' event will be emitted each time a buffer is finished with (the argument is that buffer). When the recording stops, a 'finish' event will be emitted (with the first argument as the buffer).
   * @param samples The number of samples
   * @param options Optional options struct `{doubleBuffer:bool, bits : 8/16}` where: `doubleBuffer` is whether to allocate two buffers or not (default false), and bits is the amount of bits to use (default 8).
   */
  constructor(samples: int32, options: any)

  /**
   * Will start inputting the waveform on the given pin that supports analog. If not repeating, it'll emit a `finish` event when it is done.
   * @param output The pin to output on
   * @param freq The frequency to output each sample at
   * @param options Optional options struct `{time:float,repeat:bool}` where: `time` is the that the waveform with start output at, e.g. `getTime()+1` (otherwise it is immediate), `repeat` is a boolean specifying whether to repeat the give sample
   */
  startInput(output: Pin, freq: number, options: any): void

  /**
   * Will start outputting the waveform on the given pin - the pin must have previously been initialised with analogWrite. If not repeating, it'll emit a `finish` event when it is done.
   * @param output The pin to output on
   * @param freq The frequency to output each sample at
   * @param options Optional options struct `{time:float,repeat:bool}` where: `time` is the that the waveform with start output at, e.g. `getTime()+1` (otherwise it is immediate), `repeat` is a boolean specifying whether to repeat the give sample
   */
  startOutput(output: Pin, freq: number, options: any): void

  /**
   * Stop a waveform that is currently outputting
   */
  stop(): void
}

/**
 * Class containing utility functions for the [ESP32](http://www.espruino.com/ESP32)
 */
class ESP32 {
  /**
   * Put device in deepsleep state for "us" microseconds.
   * @param us Sleeptime in us
   */
  static deepSleep(us: number): void

  /**
   * Switches Bluetooth off/on, removes saved code from Flash, resets the board,
   * and on restart creates jsVars depending on available heap (actual additional 1800)
   * @param enable switches Bluetooth on or off
   */
  static enableBLE(enable: boolean): void

  /**
   * Switches Wifi off/on, removes saved code from Flash, resets the board,
   * and on restart creates jsVars depending on available heap (actual additional 3900)
   * @param enable switches Wifi on or off
   */
  static enableWifi(enable: boolean): void

  /**
   * Returns an object that contains details about the state of the ESP32 with the following fields:
   * 
   * * `sdkVersion`   - Version of the SDK.
   * * `freeHeap`     - Amount of free heap in bytes.
   * * `BLE`			 - Status of BLE, enabled if true.
   * * `Wifi`		 - Status of Wifi, enabled if true.
   * * `minHeap`      - Minimum heap, calculated by heap_caps_get_minimum_free_size
   */
  static getState(): any

  /**
   * Perform a hardware reset/reboot of the ESP32.
   */
  static reboot(): void

  /**
   * @param pin Pin for Analog read
   * @param atten Attenuate factor
   */
  static setAtten(pin: Pin, atten: number): void

  /**
   * @param level which events should be shown (GATTS, GATTC, GAP)
   */
  static setBLE_Debug(level: number): void
}

/**
 * A class to support some simple Queue handling for RTOS queues
 */
class Queue {
  /**
   * Creates a Queue Object
   * @param queueName Name of the queue
   */
  constructor(queueName: any)

  /**
   * logs list of queues
   */
  log(): void

  /**
   * reads one character from queue, if available
   */
  read(): void

  /**
   * Writes one character to queue
   * @param char char to be send
   */
  writeChar(char: any): void
}

/**
 * A class to support some simple Task handling for RTOS tasks
 */
class Task {
  /**
   * Creates a Task Object
   * @param taskName Name of the task
   */
  constructor(taskName: any)

  /**
   * returns name of actual task
   */
  getCurrent(): any

  /**
   * logs list of tasks
   */
  log(): void

  /**
   * Sends a binary notify to task
   */
  notify(): void

  /**
   * Resumes a suspended task
   */
  resume(): void

  /**
   * Suspend task, be careful not to suspend Espruino task itself
   */
  suspend(): void
}

/**
 * A class to handle Timer on base of ESP32 Timer
 */
class Timer {
  /**
   * Creates a Timer Object
   * @param timerName Timer Name
   * @param group Timer group
   * @param index Timer index
   * @param isrIndex isr (0 = Espruino, 1 = test)
   */
  constructor(timerName: any, group: number, index: number, isrIndex: number)

  /**
   * logs list of timers
   */
  log(): void

  /**
   * Reschedules a timer, needs to be started at least once
   * @param duration duration of timmer in micro secs
   */
  reschedule(duration: number): void

  /**
   * Starts a timer
   * @param duration duration of timmer in micro secs
   */
  start(duration: number): void
}

/**
 * Class containing utility functions for the [ESP8266](http://www.espruino.com/EspruinoESP8266)
 */
class ESP8266 {
  /**
   * @param arrayOfData Array of data to CRC
   */
  static crc32(arrayOfData: any): any

  /**
   * Put the ESP8266 into 'deep sleep' for the given number of microseconds,
   * reducing power consumption drastically.
   * 
   * meaning of option values:
   * 
   * 0 - the 108th Byte of init parameter decides whether RF calibration will be performed or not.
   * 
   * 1 - run RF calibration after waking up. Power consumption is high.
   * 
   * 2 - no RF calibration after waking up. Power consumption is low.
   * 
   * 4 - no RF after waking up. Power consumption is the lowest.
   * 
   * **Note:** unlike normal Espruino boards' 'deep sleep' mode, ESP8266 deep sleep actually turns off the processor. After the given number of microseconds have elapsed, the ESP8266 will restart as if power had been turned off and then back on. *All contents of RAM will be lost*.
   * Connect GPIO 16 to RST to enable wakeup.
   * 
   * **Special:** 0 microseconds cause sleep forever until external wakeup RST pull down occurs.
   * @param micros Number of microseconds to sleep.
   * @param option posible values are 0, 1, 2 or 4
   */
  static deepSleep(micros: any, option: any): void

  /**
   * Dumps info about all sockets to the log. This is for troubleshooting the socket implementation.
   */
  static dumpSocketInfo(): void

  /**
   * **Note:** This is deprecated. Use `require("Flash").getFree()`
   */
  static getFreeFlash(): any

  /**
   * At boot time the esp8266's firmware captures the cause of the reset/reboot.  This function returns this information in an object with the following fields:
   * 
   * * `reason`: "power on", "wdt reset", "exception", "soft wdt", "restart", "deep sleep", or "reset pin"
   * * `exccause`: exception cause
   * * `epc1`, `epc2`, `epc3`: instruction pointers
   * * `excvaddr`: address being accessed
   * * `depc`: (?)
   */
  static getResetInfo(): RstInfo

  /**
   * Returns an object that contains details about the state of the ESP8266 with the following fields:
   * 
   * * `sdkVersion`   - Version of the SDK.
   * * `cpuFrequency` - CPU operating frequency in Mhz.
   * * `freeHeap`     - Amount of free heap in bytes.
   * * `maxCon`       - Maximum number of concurrent connections.
   * * `flashMap`     - Configured flash size&map: '512KB:256/256' .. '4MB:512/512'
   * * `flashKB`      - Configured flash size in KB as integer
   * * `flashChip`    - Type of flash chip as string with manufacturer & chip, ex: '0xEF 0x4016`
   */
  static getState(): any

  /**
   * Enable or disable the logging of debug information.  A value of `true` enables debug logging while a value of `false` disables debug logging.  Debug output is sent to UART1 (gpio2).
   * @param enable Enable or disable the debug logging.
   */
  static logDebug(enable: boolean): void

  /**
   * **This function is deprecated.** Please use `require("neopixel").write(pin, data)` instead
   * @param pin Pin for output signal.
   * @param arrayOfData Array of LED data.
   */
  static neopixelWrite(pin: Pin, arrayOfData: any): void

  /**
   * **DEPRECATED** - please use `Wifi.ping` instead.
   * 
   * Perform a network ping request. The parameter can be either a String or a numeric IP address.
   * @param ipAddr A string representation of an IP address.
   * @param pingCallback Optional callback function.
   */
  static ping(ipAddr: string, pingCallback: (response: {}) => void): void

  /**
   * Prints the contents of the debug log to the console.
   */
  static printLog(): void

  /**
   * Returns one line from the log or up to 128 characters.
   */
  static readLog(): void

  /**
   * Perform a hardware reset/reboot of the esp8266.
   */
  static reboot(): void

  /**
   * **Note:** This is deprecated. Use `E.setClock(80/160)`
   * **Note:**
   * Set the operating frequency of the ESP8266 processor. The default is 160Mhz.
   * 
   * **Warning**: changing the cpu frequency affects the timing of some I/O operations, notably of software SPI and I2C, so things may be a bit slower at 80Mhz.
   * @param freq Desired frequency - either 80 or 160.
   */
  static setCPUFreq(freq: any): void

  /**
   * Set the debug logging mode. It can be disabled (which frees ~1.2KB of heap), enabled in-memory only, or in-memory and output to a UART.
   * @param mode Debug log mode: 0=off, 1=in-memory only, 2=in-mem and uart0, 3=in-mem and uart1.
   */
  static setLog(mode: number): void
}

/**
 * This is a built-in class to allow you to use the ESP8266 NodeMCU boards's pin namings to access pins. It is only available on ESP8266-based boards.
 */
class NodeMCU {
  /**
   */
  static A0: Pin

  /**
   */
  static D0: Pin

  /**
   */
  static D1: Pin

  /**
   */
  static D10: Pin

  /**
   */
  static D2: Pin

  /**
   */
  static D3: Pin

  /**
   */
  static D4: Pin

  /**
   */
  static D5: Pin

  /**
   */
  static D6: Pin

  /**
   */
  static D7: Pin

  /**
   */
  static D8: Pin

  /**
   */
  static D9: Pin
}

/**
 * This is the built-in class for the Arduino-style pin namings on ST Nucleo boards
 */
class Nucleo {
  /**
   */
  static A0: Pin

  /**
   */
  static A1: Pin

  /**
   */
  static A2: Pin

  /**
   */
  static A3: Pin

  /**
   */
  static A4: Pin

  /**
   */
  static A5: Pin

  /**
   */
  static D0: Pin

  /**
   */
  static D1: Pin

  /**
   */
  static D10: Pin

  /**
   */
  static D11: Pin

  /**
   */
  static D12: Pin

  /**
   */
  static D13: Pin

  /**
   */
  static D14: Pin

  /**
   */
  static D15: Pin

  /**
   */
  static D2: Pin

  /**
   */
  static D3: Pin

  /**
   */
  static D4: Pin

  /**
   */
  static D5: Pin

  /**
   */
  static D6: Pin

  /**
   */
  static D7: Pin

  /**
   */
  static D8: Pin

  /**
   */
  static D9: Pin
}

/**
 * The Bangle.js's vibration motor.
 */
declare VIBRATE:Pin;

/**
 * On most Espruino board there are LEDs, in which case `LED` will be an actual Pin.
 * 
 * On Bangle.js there are no LEDs, so to remain compatible with example code that might
 * expect an LED, this is an object that behaves like a pin, but which just displays
 * a circle on the display
 */
declare var LED: any

/**
 * On most Espruino board there are LEDs, in which case `LED1` will be an actual Pin.
 * 
 * On Bangle.js there are no LEDs, so to remain compatible with example code that might
 * expect an LED, this is an object that behaves like a pin, but which just displays
 * a circle on the display
 */
declare var LED1: any

/**
 * On most Espruino board there are LEDs, in which case `LED2` will be an actual Pin.
 * 
 * On Bangle.js there are no LEDs, so to remain compatible with example code that might
 * expect an LED, this is an object that behaves like a pin, but which just displays
 * a circle on the display
 */
declare var LED2: any

/**
 * The Bluetooth Serial port - used when data is sent or received over Bluetooth Smart on nRF51/nRF52 chips.
 */
declare var Bluetooth: Serial

/**
 * A simple VT100 terminal emulator.
 * 
 * When data is sent to the `Terminal` object, `Graphics.getInstance()`
 * is called and if an instance of `Graphics` is found then characters
 * are written to it.
 */
declare var Terminal: Serial

/**
 * The pin connected to the 'A' button. Reads as `1` when pressed, `0` when not
 */
declare var BTNA: Pin

/**
 * The pin connected to the 'B' button. Reads as `1` when pressed, `0` when not
 */
declare var BTNB: Pin

/**
 * The pin connected to the up button. Reads as `1` when pressed, `0` when not
 */
declare var BTNU: Pin

/**
 * The pin connected to the down button. Reads as `1` when pressed, `0` when not
 */
declare var BTND: Pin

/**
 * The pin connected to the left button. Reads as `1` when pressed, `0` when not
 */
declare var BTNL: Pin

/**
 * The pin connected to the right button. Reads as `1` when pressed, `0` when not
 */
declare var BTNR: Pin

/**
 * The pin connected to Corner #1
 */
declare var CORNER1: Pin

/**
 * The pin connected to Corner #2
 */
declare var CORNER2: Pin

/**
 * The pin connected to Corner #3
 */
declare var CORNER3: Pin

/**
 * The pin connected to Corner #4
 */
declare var CORNER4: Pin

/**
 * The pin connected to Corner #5
 */
declare var CORNER5: Pin

/**
 * The pin connected to Corner #6
 */
declare var CORNER6: Pin

/**
 * **Note:** This function is only available on the [BBC micro:bit](/MicroBit) board
 * 
 * Show an image on the in-built 5x5 LED screen.
 * 
 * Image can be:
 * 
 * * A number where each bit represents a pixel (so 25 bits). eg. `5` or `0x1FFFFFF`
 * * A string, eg: `show("10001")`. Newlines are ignored, and anything that is not
 * a space or `0` is treated as a 1.
 * * An array of 4 bytes (more will be ignored), eg `show([1,2,3,0])`
 * 
 * For instance the following works for images:
 * 
 * ```
 * show("#   #"+
 *      "  #  "+
 *      "  #  "+
 *      "#   #"+
 *      " ### ")
 * ```
 * 
 * This means you can also use Espruino's graphics library:
 * 
 * ```
 * var g = Graphics.createArrayBuffer(5,5,1)
 * g.drawString("E",0,0)
 * show(g.buffer)
 * ```
 * @param image The image to show
 */
declare function show(image: any): void

/**
 * **Note:** This function is only available on the [BBC micro:bit](/MicroBit) board
 * 
 * Get the current acceleration of the micro:bit from the on-board accelerometer
 * 
 * **This is deprecated.** Please use `Microbit.accel` instead.
 */
declare function acceleration(): any

/**
 * **Note:** This function is only available on the [BBC micro:bit](/MicroBit) board
 * 
 * Get the current compass position for the micro:bit from the on-board magnetometer
 * 
 * **This is deprecated.** Please use `Microbit.mag` instead.
 */
declare function compass(): any

/**
 */
declare var MOS1: Pin

/**
 */
declare var MOS2: Pin

/**
 */
declare var MOS3: Pin

/**
 */
declare var MOS4: Pin

/**
 */
declare var IOEXT0: Pin

/**
 */
declare var IOEXT1: Pin

/**
 */
declare var IOEXT2: Pin

/**
 */
declare var IOEXT3: Pin

/**
 * The pin marked SDA on the Arduino pin footprint. This is connected directly to pin A4.
 */
declare var SDA: Pin

/**
 * The pin marked SDA on the Arduino pin footprint. This is connected directly to pin A5.
 */
declare var SCL: Pin

/**
 * On Puck.js V2 (not v1.0) this is the pin that controls the FET, for high-powered outputs.
 */
declare var FET: Pin

/**
 * A variable containing the arguments given to the function:
 * 
 * ```
 * function hello() {
 *   console.log(arguments.length, JSON.stringify(arguments));
 * }
 * hello()        // 0 []
 * hello("Test")  // 1 ["Test"]
 * hello(1,2,3)   // 3 [1,2,3]
 * ```
 * 
 * **Note:** Due to the way Espruino works this is doesn't behave exactly
 * the same as in normal JavaScript. The length of the arguments array
 * will never be less than the number of arguments specified in the
 * function declaration: `(function(a){ return arguments.length; })() == 1`.
 * Normal JavaScript interpreters would return `0` in the above case.
 */
declare var arguments: any

/**
 * Evaluate a string containing JavaScript code
 * @param code 
 */
declare function eval(code: any): any

/**
 * Convert a string representing a number into an integer
 * @param string 
 * @param radix The Radix of the string (optional)
 */
declare function parseInt(string: any, radix: any): any

/**
 * Convert a string representing a number into an float
 * @param string 
 */
declare function parseFloat(string: any): number

/**
 * Is the parameter a finite num,ber or not? If needed, the parameter is first converted to a number.
 * @param x 
 */
declare function isFinite(x: any): boolean

/**
 * Whether the x is NaN (Not a Number) or not
 * @param x 
 */
declare function isNaN(x: any): boolean

/**
 * Encode the supplied string (or array) into a base64 string
 * @param binaryData A string of data to encode
 */
declare function btoa(binaryData: any): any

/**
 * Decode the supplied base64 string into a normal string
 * @param base64Data A string of base64 data to decode
 */
declare function atob(base64Data: any): any

/**
 * Convert a string with any character not alphanumeric or `- _ . ! ~ * ' ( )` converted to the form `%XY` where `XY` is its hexadecimal representation
 * @param str A string to encode as a URI
 */
declare function encodeURIComponent(str: any): any

/**
 * Convert any groups of characters of the form '%ZZ', into characters with hex code '0xZZ'
 * @param str A string to decode from a URI
 */
declare function decodeURIComponent(str: any): any

/**
 * A reference to the global scope, where everything is defined.
 */
declare var global: any

/**
 * When Espruino is busy, set the pin specified here high. Set this to undefined to disable the feature.
 * @param pin 
 */
declare function setBusyIndicator(pin: any): void

/**
 * When Espruino is asleep, set the pin specified here low (when it's awake, set it high). Set this to undefined to disable the feature.
 * 
 * Please see http://www.espruino.com/Power+Consumption for more details on this.
 * @param pin 
 */
declare function setSleepIndicator(pin: any): void

/**
 * Set whether we can enter deep sleep mode, which reduces power consumption to around 100uA. This only works on STM32 Espruino Boards (nRF52 boards sleep automatically).
 * 
 * Please see http://www.espruino.com/Power+Consumption for more details on this.
 * @param sleep 
 */
declare function setDeepSleep(sleep: boolean): void

/**
 * Output debugging information
 * 
 * Note: This is not included on boards with low amounts of flash memory, or the Espruino board.
 * @param root The symbol to output (optional). If nothing is specified, everything will be output
 */
declare function trace(root: any): void

/**
 * Output current interpreter state in a text form such that it can be copied to a new device
 * 
 * Espruino keeps its current state in RAM (even if the function code is stored in Flash). When you type `dump()` it dumps the current state of code in RAM plus the hardware state, then if there's code saved in flash it writes "// Code saved with E.setBootCode" and dumps that too.
 * 
 * **Note:** 'Internal' functions are currently not handled correctly. You will need to recreate these in the `onInit` function.
 */
declare function dump(): void

/**
 * Restart and load the program out of flash - this has an effect similar to
 * completely rebooting Espruino (power off/power on), but without actually
 * performing a full reset of the hardware.
 * 
 * This command only executes when the Interpreter returns to the Idle state - for
 * instance ```a=1;load();a=2;``` will still leave 'a' as undefined (or what it was
 * set to in the saved program).
 * 
 * Espruino will resume from where it was when you last typed `save()`.
 * If you want code to be executed right after loading (for instance to initialise
 * devices connected to Espruino), add an `init` event handler to `E` with
 * `E.on('init', function() { ... your_code ... });`. This will then be automatically
 * executed by Espruino every time it starts.
 * 
 * **If you specify a filename in the argument then that file will be loaded
 * from Storage after reset** in much the same way as calling `reset()` then `eval(require("Storage").read(filename))`
 * @param filename optional: The name of a text JS file to load from Storage after reset
 */
declare function load(filename: any): void

/**
 * Save the state of the interpreter into flash (including the results of calling
 * `setWatch`, `setInterval`, `pinMode`, and any listeners). The state will then be loaded automatically
 *  every time Espruino powers on or is hard-reset. To see what will get saved you can call `dump()`.
 * 
 * **Note:** If you set up intervals/etc in `onInit()` and you have already called `onInit`
 * before running `save()`, when Espruino resumes there will be two copies of your intervals -
 * the ones from before the save, and the ones from after - which may cause you problems.
 * 
 * For more information about this and other options for saving, please see
 * the [Saving code on Espruino](https://www.espruino.com/Saving) page.
 * 
 * This command only executes when the Interpreter returns to the Idle state - for
 * instance ```a=1;save();a=2;``` will save 'a' as 2.
 * 
 * When Espruino powers on, it will resume from where it was when you typed `save()`.
 * If you want code to be executed right after loading (for instance to initialise
 * devices connected to Espruino), add a function called `onInit`, or add a `init`
 * event handler to `E` with `E.on('init', function() { ... your_code ... });`.
 * This will then be automatically executed by Espruino every time it starts.
 * 
 * In order to stop the program saved with this command being loaded automatically,
 * check out [the Troubleshooting guide](https://www.espruino.com/Troubleshooting#espruino-stopped-working-after-i-typed-save-)
 */
declare function save(): void

/**
 * Reset the interpreter - clear program memory in RAM, and do not load a saved program from flash. This does NOT reset the underlying hardware (which allows you to reset the device without it disconnecting from USB).
 * 
 * This command only executes when the Interpreter returns to the Idle state - for instance ```a=1;reset();a=2;``` will still leave 'a' as undefined.
 * 
 * The safest way to do a full reset is to hit the reset button.
 * 
 * If `reset()` is called with no arguments, it will reset the board's state in
 * RAM but will not reset the state in flash. When next powered on (or when
 * `load()` is called) the board will load the previously saved code.
 * 
 * Calling `reset(true)` will cause *all saved code in flash memory to
 * be cleared as well*.
 * @param clearFlash Remove saved code from flash as well
 */
declare function reset(clearFlash: boolean): void

/**
 * Print the supplied string(s) to the console
 * 
 *  **Note:** If you're connected to a computer (not a wall adaptor) via USB but **you are not running a terminal app** then when you print data Espruino may pause execution and wait until the computer requests the data it is trying to print.
 * @param text 
 */
declare function print(text: JsVarArray): void

/**
 * Fill the console with the contents of the given function, so you can edit it.
 * 
 * NOTE: This is a convenience function - it will not edit 'inner functions'. For that, you must edit the 'outer function' and re-execute it.
 * @param funcName The name of the function to edit (either a string or just the unquoted name)
 */
declare function edit(funcName: any): void

/**
 * Should Espruino echo what you type back to you? true = yes (Default), false = no. When echo is off, the result of executing a command is not returned. Instead, you must use 'print' to send output.
 * @param echoOn 
 */
declare function echo(echoOn: boolean): void

/**
 * Return the current system time in Seconds (as a floating point number)
 */
declare function getTime(): number

/**
 * Set the current system time in seconds (`time` can be a floating
 * point value).
 * 
 * This is used with `getTime`, the time reported from `setWatch`, as
 * well as when using `new Date()`.
 * 
 * `Date.prototype.getTime()` reports the time in milliseconds, so
 * you can set the time to a `Date` object using:
 * 
 * ```
 * setTime((new Date("Tue, 19 Feb 2019 10:57")).getTime()/1000)
 * ```
 * 
 * To set the timezone for all new Dates, use `E.setTimeZone(hours)`.
 * @param time 
 */
declare function setTime(time: number): void

/**
 * Get the serial number of this board
 */
declare function getSerial(): any

/**
 * Call the function (or evaluate the string) specified REPEATEDLY after the timeout in milliseconds.
 * 
 * For instance:
 * 
 * ```
 * setInterval(function () {
 *   console.log("Hello World");
 * }, 1000);
 * // or
 * setInterval('console.log("Hello World");', 1000);
 * // both print 'Hello World' every second
 * ```
 * 
 * You can also specify extra arguments that will be sent to the function when it is executed. For example:
 * 
 * ```
 * setInterval(function (a,b) {
 *   console.log(a+" "+b);
 * }, 1000, "Hello", "World");
 * // prints 'Hello World' every second
 * ```
 * 
 * If you want to stop your function from being called, pass the number that
 * was returned by `setInterval` into the `clearInterval` function.
 * 
 *  **Note:** If `setDeepSleep(true)` has been called and the interval is greater than 5 seconds, Espruino may execute the interval up to 1 second late. This is because Espruino can only wake from deep sleep every second - and waking early would cause Espruino to waste power while it waited for the correct time.
 * @param function A Function or String to be executed
 * @param timeout The time between calls to the function (max 3153600000000 = 100 years
 * @param args Optional arguments to pass to the function when executed
 */
declare function setInterval(function: any, timeout: number, args: JsVarArray): any

/**
 * Call the function (or evaluate the string) specified ONCE after the timeout in milliseconds.
 * 
 * For instance:
 * 
 * ```
 * setTimeout(function () {
 *   console.log("Hello World");
 * }, 1000);
 * // or
 * setTimeout('console.log("Hello World");', 1000);
 * // both print 'Hello World' after a second
 * ```
 * 
 * You can also specify extra arguments that will be sent to the function when it is executed. For example:
 * 
 * ```
 * setTimeout(function (a,b) {
 *   console.log(a+" "+b);
 * }, 1000, "Hello", "World");
 * // prints 'Hello World' after 1 second
 * ```
 * 
 * If you want to stop the function from being called, pass the number that
 * was returned by `setTimeout` into the `clearTimeout` function.
 * 
 *  **Note:** If `setDeepSleep(true)` has been called and the interval is greater than 5 seconds, Espruino may execute the interval up to 1 second late. This is because Espruino can only wake from deep sleep every second - and waking early would cause Espruino to waste power while it waited for the correct time.
 * @param function A Function or String to be executed
 * @param timeout The time until the function will be executed (max 3153600000000 = 100 years
 * @param args Optional arguments to pass to the function when executed
 */
declare function setTimeout(function: any, timeout: number, args: JsVarArray): any

/**
 * Clear the Interval that was created with `setInterval`, for example:
 * 
 * ```var id = setInterval(function () { print('foo'); }, 1000);```
 * 
 * ```clearInterval(id);```
 * 
 * If no argument is supplied, all timeouts and intervals are stopped.
 * 
 * To avoid accidentally deleting all Intervals, if a parameter is supplied but is `undefined` then an Exception will be thrown.
 * @param id The id returned by a previous call to setInterval
 */
declare function clearInterval(id: JsVarArray): void

/**
 * Clear the Timeout that was created with `setTimeout`, for example:
 * 
 * ```var id = setTimeout(function () { print('foo'); }, 1000);```
 * 
 * ```clearTimeout(id);```
 * 
 * If no argument is supplied, all timeouts and intervals are stopped.
 * 
 * To avoid accidentally deleting all Timeouts, if a parameter is supplied but is `undefined` then an Exception will be thrown.
 * @param id The id returned by a previous call to setTimeout
 */
declare function clearTimeout(id: JsVarArray): void

/**
 * Change the Interval on a callback created with `setInterval`, for example:
 * 
 * ```var id = setInterval(function () { print('foo'); }, 1000); // every second```
 * 
 * ```changeInterval(id, 1500); // now runs every 1.5 seconds```
 * 
 * This takes effect immediately and resets the timeout, so in the example above,
 * regardless of when you call `changeInterval`, the next interval will occur 1500ms
 * after it.
 * @param id The id returned by a previous call to setInterval
 * @param time The new time period in ms
 */
declare function changeInterval(id: any, time: number): void

/**
 * Read 8 bits of memory at the given location - DANGEROUS!
 * @param addr The address in memory to read
 * @param count (optional) the number of items to read. If >1 a Uint8Array will be returned.
 */
declare function peek8(addr: number, count:1=1): number
declare function peek8(addr: number, count: number): Uint8Array

/**
 * Write 8 bits of memory at the given location - VERY DANGEROUS!
 * @param addr The address in memory to write
 * @param value The value to write, or an array of values
 */
declare function poke8(addr: number, value: any): void

/**
 * Read 16 bits of memory at the given location - DANGEROUS!
 * @param addr The address in memory to read
 * @param count (optional) the number of items to read. If >1 a Uint16Array will be returned.
 */
declare function peek16(addr: number, count:1=1): number
declare function peek16(addr: number, count: number): Uint16Array

/**
 * Write 16 bits of memory at the given location - VERY DANGEROUS!
 * @param addr The address in memory to write
 * @param value The value to write, or an array of values
 */
declare function poke16(addr: number, value: any): void

/**
 * Read 32 bits of memory at the given location - DANGEROUS!
 * @param addr The address in memory to read
 * @param count (optional) the number of items to read. If >1 a Uint32Array will be returned.
 */
declare function peek32(addr: number, count:1=1): number
declare function peek32(addr: number, count: number): Uint32Array

/**
 * Write 32 bits of memory at the given location - VERY DANGEROUS!
 * @param addr The address in memory to write
 * @param value The value to write, or an array of values
 */
declare function poke32(addr: number, value: any): void

/**
 * Get the analog value of the given pin
 * 
 * This is different to Arduino which only returns an integer between 0 and 1023
 * 
 * However only pins connected to an ADC will work (see the datasheet)
 * 
 *  **Note:** if you didn't call `pinMode` beforehand then this function will also reset pin's state to `"analog"`
 * @param pin The pin to use,You can find out which pins to use by looking at [your board's reference page](#boards) and searching for pins with the `ADC` markers.
 */
declare function analogRead(pin: Pin): number

/**
 * Set the analog Value of a pin. It will be output using PWM.
 * 
 * Objects can contain:
 * 
 * * `freq` - pulse frequency in Hz, eg. ```analogWrite(A0,0.5,{ freq : 10 });``` - specifying a frequency will force PWM output, even if the pin has a DAC
 * * `soft` - boolean, If true software PWM is used if hardware is not available.
 * * `forceSoft` - boolean, If true software PWM is used even if hardware PWM or a DAC is available
 * 
 *  **Note:** if you didn't call `pinMode` beforehand then this function will also reset pin's state to `"output"`
 * @param pin The pin to use,You can find out which pins to use by looking at [your board's reference page](#boards) and searching for pins with the `PWM` or `DAC` markers.
 * @param value A value between 0 and 1
 * @param options An object containing options for analog output - see below
 */
declare function analogWrite(pin: Pin, value: number, options: any): void

/**
 * Pulse the pin with the value for the given time in milliseconds. It uses a hardware timer to produce accurate pulses, and returns immediately (before the pulse has finished). Use `digitalPulse(A0,1,0)` to wait until a previous pulse has finished.
 * 
 * eg. `digitalPulse(A0,1,5);` pulses A0 high for 5ms. `digitalPulse(A0,1,[5,2,4]);` pulses A0 high for 5ms, low for 2ms, and high for 4ms
 * 
 *  **Note:** if you didn't call `pinMode` beforehand then this function will also reset pin's state to `"output"`
 * 
 * digitalPulse is for SHORT pulses that need to be very accurate. If you're doing anything over a few milliseconds, use setTimeout instead.
 * @param pin The pin to use
 * @param value Whether to pulse high (true) or low (false)
 * @param time A time in milliseconds, or an array of times (in which case a square wave will be output starting with a pulse of 'value')
 */
declare function digitalPulse(pin: Pin, value: boolean, time: any): void

/**
 * Set the digital value of the given pin.
 * 
 *  **Note:** if you didn't call `pinMode` beforehand then this function will also reset pin's state to `"output"`
 * 
 * If pin argument is an array of pins (eg. `[A2,A1,A0]`) the value argument will be treated
 * as an array of bits where the last array element is the least significant bit.
 * 
 * In this case, pin values are set least significant bit first (from the right-hand side
 * of the array of pins). This means you can use the same pin multiple times, for
 * example `digitalWrite([A1,A1,A0,A0],0b0101)` would pulse A0 followed by A1.
 * 
 * If the pin argument is an object with a `write` method, the `write` method will
 * be called with the value passed through.
 * @param pin The pin to use
 * @param value Whether to pulse high (true) or low (false)
 */
declare function digitalWrite(pin: any, value: number): void

/**
 * Get the digital value of the given pin.
 * 
 *  **Note:** if you didn't call `pinMode` beforehand then this function will also reset pin's state to `"input"`
 * 
 * If the pin argument is an array of pins (eg. `[A2,A1,A0]`) the value returned will be an number where
 * the last array element is the least significant bit, for example if `A0=A1=1` and `A2=0`, `digitalRead([A2,A1,A0]) == 0b011`
 * 
 * If the pin argument is an object with a `read` method, the `read` method will be called and the integer value it returns
 * passed back.
 * @param pin The pin to use
 */
declare function digitalRead(pin: any): number

/**
 * Set the mode of the given pin.
 * 
 *  * `auto`/`undefined` - Don't change state, but allow `digitalWrite`/etc to automatically change state as appropriate
 *  * `analog` - Analog input
 *  * `input` - Digital input
 *  * `input_pullup` - Digital input with internal ~40k pull-up resistor
 *  * `input_pulldown` - Digital input with internal ~40k pull-down resistor
 *  * `output` - Digital output
 *  * `opendrain` - Digital output that only ever pulls down to 0v. Sending a logical `1` leaves the pin open circuit
 *  * `opendrain_pullup` - Digital output that pulls down to 0v. Sending a logical `1` enables internal ~40k pull-up resistor
 *  * `af_output` - Digital output from built-in peripheral
 *  * `af_opendrain` - Digital output from built-in peripheral that only ever pulls down to 0v. Sending a logical `1` leaves the pin open circuit
 * 
 *  **Note:** `digitalRead`/`digitalWrite`/etc set the pin mode automatically *unless* `pinMode` has been called first.
 * If you want `digitalRead`/etc to set the pin mode automatically after you have called `pinMode`, simply call it again
 * with no mode argument (`pinMode(pin)`), `auto` as the argument (`pinMode(pin, "auto")`), or with the 3rd 'automatic'
 * argument set to true (`pinMode(pin, "output", true)`).
 * @param pin The pin to set pin mode for
 * @param mode The mode - a string that is either 'analog', 'input', 'input_pullup', 'input_pulldown', 'output', 'opendrain', 'af_output' or 'af_opendrain'. Do not include this argument or use 'auto' if you want to revert to automatic pin mode setting.
 * @param automatic Optional, default is false. If true, subsequent commands will automatically change the state (see notes below)
 */
declare function pinMode(pin: Pin, mode: any, automatic: boolean): void

/**
 * Return the current mode of the given pin. See `pinMode` for more information on returned values.
 * @param pin The pin to check
 */
declare function getPinMode(pin: Pin): any

/**
 * Shift an array of data out using the pins supplied *least significant bit first*,
 * for example:
 * 
 * ```
 * // shift out to single clk+data
 * shiftOut(A0, { clk : A1 }, [1,0,1,0]);
 * ```
 * 
 * ```
 * // shift out a whole byte (like software SPI)
 * shiftOut(A0, { clk : A1, repeat: 8 }, [1,2,3,4]);
 * ```
 * 
 * ```
 * // shift out via 4 data pins
 * shiftOut([A3,A2,A1,A0], { clk : A4 }, [1,2,3,4]);
 * ```
 * 
 * `options` is an object of the form:
 * 
 * ```
 * {
 *   clk : pin, // a pin to use as the clock (undefined = no pin)
 *   clkPol : bool, // clock polarity - default is 0 (so 1 normally, pulsing to 0 to clock data in)
 *   repeat : int, // number of clocks per array item
 * }
 * ```
 * 
 * Each item in the `data` array will be output to the pins, with the first
 * pin in the array being the MSB and the last the LSB, then the clock will be
 * pulsed in the polarity given.
 * 
 * `repeat` is the amount of times shift data out for each array item. For instance
 * we may want to shift 8 bits out through 2 pins - in which case we need to set
 * repeat to 4.
 * @param pins A pin, or an array of pins to use
 * @param options Options, for instance the clock (see below)
 * @param data The data to shift out (see `E.toUint8Array` for info on the forms this can take)
 */
declare function shiftOut(pins: any, options: any, data: any): void

/**
 * Call the function specified when the pin changes. Watches set with `setWatch` can be removed using `clearWatch`.
 * 
 * If the `options` parameter is an object, it can contain the following information (all optional):
 * 
 * ```
 * {
 *    // Whether to keep producing callbacks, or remove the watch after the first callback
 *    repeat: true/false(default),
 *    // Trigger on the rising or falling edge of the signal. Can be a string, or 1='rising', -1='falling', 0='both'
 *    edge:'rising'(default for built-in buttons)/'falling'/'both'(default for pins),
 *    // Use software-debouncing to stop multiple calls if a switch bounces
 *    // This is the time in milliseconds to wait for bounces to subside, or 0 to disable
 *    debounce:10 (0 is default for pins, 25 is default for built-in buttons),
 *    // Advanced: If the function supplied is a 'native' function (compiled or assembly)
 *    // setting irq:true will call that function in the interrupt itself
 *    irq : false(default)
 *    // Advanced: If specified, the given pin will be read whenever the watch is called
 *    // and the state will be included as a 'data' field in the callback
 *    data : pin
 *    // Advanced: On Nordic devices, a watch may be 'high' or 'low' accuracy. By default low
 *    // accuracy is used (which is better for power consumption), but this means that
 *    // high speed pulses (less than 25us) may not be reliably received. Setting hispeed=true
 *    // allows for detecting high speed pulses at the expense of higher idle power consumption
 *    hispeed : true
 * }
 * ```
 * 
 * The `function` callback is called with an argument, which is an object of type `{state:bool, time:float, lastTime:float}`.
 * 
 *  * `state` is whether the pin is currently a `1` or a `0`
 *  * `time` is the time in seconds at which the pin changed state
 *  * `lastTime` is the time in seconds at which the **pin last changed state**. When using `edge:'rising'` or `edge:'falling'`, this is not the same as when the function was last called.
 *  * `data` is included if `data:pin` was specified in the options, and can be used for reading in clocked data
 * 
 * For instance, if you want to measure the length of a positive pulse you could use `setWatch(function(e) { console.log(e.time-e.lastTime); }, BTN, { repeat:true, edge:'falling' });`.
 * This will only be called on the falling edge of the pulse, but will be able to measure the width of the pulse because `e.lastTime` is the time of the rising edge.
 * 
 * Internally, an interrupt writes the time of the pin's state change into a queue with the exact
 * time that it happened, and the function supplied to `setWatch` is executed only from the main
 * message loop. However, if the callback is a native function `void (bool state)` then you can
 * add `irq:true` to options, which will cause the function to be called from within the IRQ.
 * When doing this, interrupts will happen on both edges and there will be no debouncing.
 * 
 * **Note:** if you didn't call `pinMode` beforehand then this function will reset pin's state to `"input"`
 * 
 * **Note:** The STM32 chip (used in the [Espruino Board](/EspruinoBoard) and [Pico](/Pico)) cannot
 * watch two pins with the same number - eg `A0` and `B0`.
 * 
 * **Note:** On nRF52 chips (used in Puck.js, Pixl.js, MDBT42Q) `setWatch` disables the GPIO
 * output on that pin. In order to be able to write to the pin again you need to disable
 * the watch with `clearWatch`.
 * @param function A Function or String to be executed
 * @param pin The pin to watch
 * @param options If a boolean or integer, it determines whether to call this once (false = default) or every time a change occurs (true). Can be an object of the form `{ repeat: true/false(default), edge:'rising'/'falling'/'both'(default), debounce:10}` - see below for more information.
 */
declare function setWatch(function: any, pin: Pin, options: any): any

/**
 * Clear the Watch that was created with setWatch. If no parameter is supplied, all watches will be removed.
 * 
 * To avoid accidentally deleting all Watches, if a parameter is supplied but is `undefined` then an Exception will be thrown.
 * @param id The id returned by a previous call to setWatch
 */
declare function clearWatch(id: JsVarArray): void

/**
 * Load the given module, and return the exported functions and variables.
 * 
 * For example:
 * 
 * ```
 * var s = require("Storage");
 * s.write("test", "hello world");
 * print(s.read("test"));
 * // prints "hello world"
 * ```
 * 
 * Check out [the page on Modules](/Modules) for an explanation
 * of what modules are and how you can use them.
 * @param moduleName A String containing the name of the given module
 */
declare function require(moduleName: any): any

/**
 */
declare var NaN: number

/**
 */
declare var Infinity: number

/**
 */
declare var HIGH: number

/**
 */
declare var LOW: number

/**
 * The USB Serial port
 */
declare var USB: Serial

/**
 * The first Serial (USART) port
 */
declare var Serial1: Serial

/**
 * The second Serial (USART) port
 */
declare var Serial2: Serial

/**
 * The third Serial (USART) port
 */
declare var Serial3: Serial

/**
 * The fourth Serial (USART) port
 */
declare var Serial4: Serial

/**
 * The fifth Serial (USART) port
 */
declare var Serial5: Serial

/**
 * The sixth Serial (USART) port
 */
declare var Serial6: Serial

/**
 * A loopback serial device. Data sent to `LoopbackA` comes out of `LoopbackB` and vice versa
 */
declare var LoopbackA: Serial

/**
 * A loopback serial device. Data sent to `LoopbackA` comes out of `LoopbackB` and vice versa
 */
declare var LoopbackB: Serial

/**
 * A telnet serial device that maps to the built-in telnet console server (devices that have built-in wifi only).
 */
declare var Telnet: Serial

/**
 * The first SPI port
 */
declare var SPI1: SPI

/**
 * The second SPI port
 */
declare var SPI2: SPI

/**
 * The third SPI port
 */
declare var SPI3: SPI

/**
 * The first I2C port
 */
declare var I2C1: I2C

/**
 * The second I2C port
 */
declare var I2C2: I2C

/**
 * The third I2C port
 */
declare var I2C3: I2C

/**
 * Simple library for compression/decompression using [heatshrink](https://github.com/atomicobject/heatshrink), an [LZSS](https://en.wikipedia.org/wiki/Lempel%E2%80%93Ziv%E2%80%93Storer%E2%80%93Szymanski) compression tool.
 * 
 * Espruino uses heatshrink internally to compress RAM down to fit in Flash memory when `save()` is used. This just exposes that functionality.
 * 
 * Functions here take and return buffers of data. There is no support for streaming, so both the compressed and decompressed data must be able to fit in memory at the same time.
 */
declare module "heatshrink" {
  /**
   * Simple library for compression/decompression using [heatshrink](https://github.com/atomicobject/heatshrink), an [LZSS](https://en.wikipedia.org/wiki/Lempel%E2%80%93Ziv%E2%80%93Storer%E2%80%93Szymanski) compression tool.
   * 
   * Espruino uses heatshrink internally to compress RAM down to fit in Flash memory when `save()` is used. This just exposes that functionality.
   * 
   * Functions here take and return buffers of data. There is no support for streaming, so both the compressed and decompressed data must be able to fit in memory at the same time.
   */
  export = class heatshrink {
    /**
     * @param data The data to compress
     */
    static compress(data: any): ArrayBuffer
  
    /**
     * @param data The data to decompress
     */
    static decompress(data: any): ArrayBuffer
  }
}


/**
 * Cryptographic functions
 * 
 * **Note:** This library is currently only included in builds for boards where there is space. For other boards there is `crypto.js` which implements SHA1 in JS.
 */
declare module "crypto" {
  /**
   * Cryptographic functions
   * 
   * **Note:** This library is currently only included in builds for boards where there is space. For other boards there is `crypto.js` which implements SHA1 in JS.
   */
  export = class crypto {
    /**
     * Class containing AES encryption/decryption
     */
    static AES: AES
  
    /**
     * Password-Based Key Derivation Function 2 algorithm, using SHA512
     * @param passphrase Passphrase
     * @param salt Salt for turning passphrase into a key
     * @param options Object of Options, `{ keySize: 8 (in 32 bit words), iterations: 10, hasher: 'SHA1'/'SHA224'/'SHA256'/'SHA384'/'SHA512' }`
     */
    static PBKDF2(passphrase: any, salt: any, options: any): ArrayBuffer
  
    /**
     * Performs a SHA1 hash and returns the result as a 20 byte ArrayBuffer.
     * 
     * **Note:** On some boards (currently only Espruino Original) there
     * isn't space for a fully unrolled SHA1 implementation so a slower
     * all-JS implementation is used instead.
     * @param message The message to apply the hash to
     */
    static SHA1(message: any): ArrayBuffer
  
    /**
     * Performs a SHA224 hash and returns the result as a 28 byte ArrayBuffer
     * @param message The message to apply the hash to
     */
    static SHA224(message: any): ArrayBuffer
  
    /**
     * Performs a SHA256 hash and returns the result as a 32 byte ArrayBuffer
     * @param message The message to apply the hash to
     */
    static SHA256(message: any): ArrayBuffer
  
    /**
     * Performs a SHA384 hash and returns the result as a 48 byte ArrayBuffer
     * @param message The message to apply the hash to
     */
    static SHA384(message: any): ArrayBuffer
  
    /**
     * Performs a SHA512 hash and returns the result as a 64 byte ArrayBuffer
     * @param message The message to apply the hash to
     */
    static SHA512(message: any): ArrayBuffer
  }
  
  /**
   * Class containing AES encryption/decryption
   * 
   * **Note:** This library is currently only included in builds for boards where there is space. For other boards there is `crypto.js` which implements SHA1 in JS.
   */
  export class AES {
    /**
     * @param passphrase Message to decrypt
     * @param key Key to encrypt message - must be an ArrayBuffer of 128, 192, or 256 BITS
     * @param options An optional object, may specify `{ iv : new Uint8Array(16), mode : 'CBC|CFB|CTR|OFB|ECB' }`
     */
    static decrypt(passphrase: any, key: any, options: any): ArrayBuffer
  
    /**
     * @param passphrase Message to encrypt
     * @param key Key to encrypt message - must be an ArrayBuffer of 128, 192, or 256 BITS
     * @param options An optional object, may specify `{ iv : new Uint8Array(16), mode : 'CBC|CFB|CTR|OFB|ECB' }`
     */
    static encrypt(passphrase: any, key: any, options: any): ArrayBuffer
  }
}


/**
 * This library handles interfacing with a FAT32 filesystem on an SD card. The API is designed to be similar to node.js's - However Espruino does not currently support asynchronous file IO, so the functions behave like node.js's xxxxSync functions. Versions of the functions with 'Sync' after them are also provided for compatibility.
 * 
 * To use this, you must type ```var fs = require('fs')``` to get access to the library
 * 
 * See [the page on File IO](http://www.espruino.com/File+IO) for more information, and for examples on wiring up an SD card if your device doesn't come with one.
 * 
 * **Note:** If you want to remove an SD card after you have started using it, you *must* call `E.unmountSD()` or you may cause damage to the card.
 */
declare module "fs" {
  /**
   * This library handles interfacing with a FAT32 filesystem on an SD card. The API is designed to be similar to node.js's - However Espruino does not currently support asynchronous file IO, so the functions behave like node.js's xxxxSync functions. Versions of the functions with 'Sync' after them are also provided for compatibility.
   * 
   * To use this, you must type ```var fs = require('fs')``` to get access to the library
   * 
   * See [the page on File IO](http://www.espruino.com/File+IO) for more information, and for examples on wiring up an SD card if your device doesn't come with one.
   * 
   * **Note:** If you want to remove an SD card after you have started using it, you *must* call `E.unmountSD()` or you may cause damage to the card.
   */
  export = class fs {
    /**
     * Append the data to the given file, created a new file if it doesn't exist
     * 
     * NOTE: Espruino does not yet support Async file IO, so this function behaves like the 'Sync' version.
     * @param path The path of the file to write
     * @param data The data to write to the file
     */
    static appendFile(path: any, data: any): boolean
  
    /**
     * Append the data to the given file, created a new file if it doesn't exist
     * @param path The path of the file to write
     * @param data The data to write to the file
     */
    static appendFileSync(path: any, data: any): boolean
  
    /**
     * Create the directory
     * 
     * NOTE: Espruino does not yet support Async file IO, so this function behaves like the 'Sync' version.
     * @param path The name of the directory to create
     */
    static mkdir(path: any): boolean
  
    /**
     * Create the directory
     * @param path The name of the directory to create
     */
    static mkdirSync(path: any): boolean
  
    /**
     * @param source The source file/stream that will send content.
     * @param destination The destination file/stream that will receive content from the source.
     * @param options An optional object `{ chunkSize : int=64, end : bool=true, complete : function }`,chunkSize : The amount of data to pipe from source to destination at a time,complete : a function to call when the pipe activity is complete,end : call the 'end' function on the destination when the source is finished
     */
    static pipe(source: any, destination: any, options: any): void
  
    /**
     * List all files in the supplied directory, returning them as an array of strings.
     * 
     * NOTE: Espruino does not yet support Async file IO, so this function behaves like the 'Sync' version.
     * @param path The path of the directory to list. If it is not supplied, '' is assumed, which will list the root directory
     */
    static readdir(path: any): any
  
    /**
     * List all files in the supplied directory, returning them as an array of strings.
     * @param path The path of the directory to list. If it is not supplied, '' is assumed, which will list the root directory
     */
    static readdirSync(path: any): any
  
    /**
     * Read all data from a file and return as a string
     * 
     * NOTE: Espruino does not yet support Async file IO, so this function behaves like the 'Sync' version.
     * @param path The path of the file to read
     */
    static readFile(path: any): any
  
    /**
     * Read all data from a file and return as a string.
     * 
     * **Note:** The size of files you can load using this method is limited by the amount of available RAM. To read files a bit at a time, see the `File` class.
     * @param path The path of the file to read
     */
    static readFileSync(path: any): any
  
    /**
     * Return information on the given file. This returns an object with the following
     * fields:
     * 
     * size: size in bytes
     * dir: a boolean specifying if the file is a directory or not
     * mtime: A Date structure specifying the time the file was last modified
     * @param path The path of the file to get information on
     */
    static statSync(path: any): any
  
    /**
     * Delete the given file
     * 
     * NOTE: Espruino does not yet support Async file IO, so this function behaves like the 'Sync' version.
     * @param path The path of the file to delete
     */
    static unlink(path: any): boolean
  
    /**
     * Delete the given file
     * @param path The path of the file to delete
     */
    static unlinkSync(path: any): boolean
  
    /**
     * Write the data to the given file
     * 
     * NOTE: Espruino does not yet support Async file IO, so this function behaves like the 'Sync' version.
     * @param path The path of the file to write
     * @param data The data to write to the file
     */
    static writeFile(path: any, data: any): boolean
  
    /**
     * Write the data to the given file
     * @param path The path of the file to write
     * @param data The data to write to the file
     */
    static writeFileSync(path: any, data: any): boolean
  }
}


/**
 * This library allows you to write to Neopixel/WS281x/APA10x/SK6812 LED strips
 * 
 * These use a high speed single-wire protocol which needs platform-specific
 * implementation on some devices - hence this library to simplify things.
 */
declare module "neopixel" {
  /**
   * This library allows you to write to Neopixel/WS281x/APA10x/SK6812 LED strips
   * 
   * These use a high speed single-wire protocol which needs platform-specific
   * implementation on some devices - hence this library to simplify things.
   */
  export = class neopixel {
    /**
     * Write to a strip of NeoPixel/WS281x/APA104/APA106/SK6812-style LEDs
     * attached to the given pin.
     * 
     * ```
     * // set just one pixel, red, green, blue
     * require("neopixel").write(B15, [255,0,0]);
     * ```
     * 
     * ```
     * // Produce an animated rainbow over 25 LEDs
     * var rgb = new Uint8ClampedArray(25*3);
     * var pos = 0;
     * function getPattern() {
     *   pos++;
     *   for (var i=0;i<rgb.length;) {
     *     rgb[i++] = (1 + Math.sin((i+pos)*0.1324)) * 127;
     *     rgb[i++] = (1 + Math.sin((i+pos)*0.1654)) * 127;
     *     rgb[i++] = (1 + Math.sin((i+pos)*0.1)) * 127;
     *   }
     *   return rgb;
     * }
     * setInterval(function() {
     *   require("neopixel").write(B15, getPattern());
     * }, 100);
     * ```
     * 
     * **Note:**
     * 
     * * Different types of LED have the data in different orders - so don't
     * be surprised by RGB or BGR orderings!
     * 
     * * Some LED strips (SK6812) actually take 4 bytes per LED (red, green, blue and white).
     * These are still supported but the array of data supplied must still be a multiple of 3
     * bytes long. Just round the size up - it won't cause any problems.
     * 
     * * On some platforms like STM32, pins capable of hardware SPI MOSI
     * are required.
     * 
     * * Espruino devices tend to have 3.3v IO, while WS2812/etc run
     * off of 5v. Many WS2812 will only register a logic '1' at 70%
     * of their input voltage - so if powering them off 5v you will not
     * be able to send them data reliably. You can work around this by
     * powering the LEDs off a lower voltage (for example 3.7v from a LiPo
     * battery), can put the output into the `af_opendrain` state and use
     * a pullup resistor to 5v on STM32 based boards (nRF52 are not 5v tolerant
     * so you can't do this), or can use a level shifter to shift the voltage up
     * into the 5v range.
     * @param pin The Pin the LEDs are connected to
     * @param data The data to write to the LED strip (must be a multiple of 3 bytes long)
     */
    static write(pin: Pin, data: any): void
  }
}



declare module "CC3000" {
  
  export = class CC3000 {
    /**
     * Initialise the CC3000 and return a WLAN object
     * @param spi Device to use for SPI (or undefined to use the default). SPI should be 1,000,000 baud, and set to 'mode 1'
     * @param cs The pin to use for Chip Select
     * @param en The pin to use for Enable
     * @param irq The pin to use for Interrupts
     */
    static connect(spi: SPI, cs: Pin, en: Pin, irq: Pin): WLAN
  }
}


/**
 * The ESP8266 library is specific to the ESP8266 version of Espruino, i.e., running Espruino on an ESP8266 module (not to be confused with using the ESP8266 as Wifi add-on to an Espruino board).  This library contains functions to handle ESP8266-specific actions.
 * For example: `var esp8266 = require('ESP8266'); esp8266.reboot();` performs a hardware reset of the module.
 */
declare module "ESP8266" {
  /**
   * The ESP8266 library is specific to the ESP8266 version of Espruino, i.e., running Espruino on an ESP8266 module (not to be confused with using the ESP8266 as Wifi add-on to an Espruino board).  This library contains functions to handle ESP8266-specific actions.
   * For example: `var esp8266 = require('ESP8266'); esp8266.reboot();` performs a hardware reset of the module.
   */
  export = class ESP8266 {
  
  }
}


/**
 * This library allows you to create http servers and make http requests
 * 
 * In order to use this, you will need an extra module to get network connectivity such as the [TI CC3000](/CC3000) or [WIZnet W5500](/WIZnet).
 * 
 * This is designed to be a cut-down version of the [node.js library](http://nodejs.org/api/http.html). Please see the [Internet](/Internet) page for more information on how to use it.
 */
declare module "http" {
  /**
   * This library allows you to create http servers and make http requests
   * 
   * In order to use this, you will need an extra module to get network connectivity such as the [TI CC3000](/CC3000) or [WIZnet W5500](/WIZnet).
   * 
   * This is designed to be a cut-down version of the [node.js library](http://nodejs.org/api/http.html). Please see the [Internet](/Internet) page for more information on how to use it.
   */
  export = class http {
    /**
     * Create an HTTP Server
     * 
     * When a request to the server is made, the callback is called. In the callback you can use the methods on the response (`httpSRs`) to send data. You can also add `request.on('data',function() { ... })` to listen for POSTed data
     * @param callback A function(request,response) that will be called when a connection is made
     */
    static createServer(callback: any): httpSrv
  
    /**
     * Request a webpage over HTTP - a convenience function for `http.request()` that makes sure the HTTP command is 'GET', and that calls `end` automatically.
     * 
     * ```
     * require("http").get("http://pur3.co.uk/hello.txt", function(res) {
     *   res.on('data', function(data) {
     *     console.log("HTTP> "+data);
     *   });
     *   res.on('close', function(data) {
     *     console.log("Connection closed");
     *   });
     * });
     * ```
     * 
     * See `http.request()` and [the Internet page](/Internet) and ` for more usage examples.
     * @param options A simple URL, or an object containing host,port,path,method fields
     * @param callback A function(res) that will be called when a connection is made. You can then call `res.on('data', function(data) { ... })` and `res.on('close', function() { ... })` to deal with the response.
     */
    static get(options: any, callback: any): httpCRq
  
    /**
     * Create an HTTP Request - `end()` must be called on it to complete the operation. `options` is of the form:
     * 
     * ```
     * var options = {
     *     host: 'example.com', // host name
     *     port: 80,            // (optional) port, defaults to 80
     *     path: '/',           // path sent to server
     *     method: 'GET',       // HTTP command sent to server (must be uppercase 'GET', 'POST', etc)
     *     protocol: 'http:',   // optional protocol - https: or http:
     *     headers: { key : value, key : value } // (optional) HTTP headers
     *   };
     * var req = require("http").request(options, function(res) {
     *   res.on('data', function(data) {
     *     console.log("HTTP> "+data);
     *   });
     *   res.on('close', function(data) {
     *     console.log("Connection closed");
     *   });
     * });
     * // You can req.write(...) here if your request requires data to be sent.
     * req.end(); // called to finish the HTTP request and get the response
     * ```
     * 
     * You can easily pre-populate `options` from a URL using `var options = url.parse("http://www.example.com/foo.html")`
     * 
     * There's an example of using [`http.request` for HTTP POST here](/Internet#http-post)
     * 
     * **Note:** if TLS/HTTPS is enabled, options can have `ca`, `key` and `cert` fields. See `tls.connect` for
     * more information about these and how to use them.
     * @param options An object containing host,port,path,method,headers fields (and also ca,key,cert if HTTPS is enabled)
     * @param callback A function(res) that will be called when a connection is made. You can then call `res.on('data', function(data) { ... })` and `res.on('close', function() { ... })` to deal with the response.
     */
    static request(options: any, callback: any): httpCRq
  }
  
  /**
   * The HTTP server created by `require('http').createServer`
   */
  export class httpSrv {
    /**
     * Stop listening for new HTTP connections
     */
    close(): void
  
    /**
     * Start listening for new HTTP connections on the given port
     * @param port The port to listen on
     */
    listen(port: int32): any
  }
  
  /**
   * The HTTP server request
   */
  export class httpSRq {
    /**
     * The headers to sent to the server with this HTTP request.
     */
    headers: any
  
    /**
     * The HTTP method used with this request. Often `"GET"`.
     */
    method: any
  
    /**
     * The URL requested in this HTTP request, for instance:
     * 
     * * `"/"` - the main page
     * * `"/favicon.ico"` - the web page's icon
     */
    url: any
  
    /**
     * Called when the connection closes.
     */
    on(event: 'close', callback: () => void): void
  
    /**
     * The 'data' event is called when data is received. If a handler is defined with `X.on('data', function(data) { ... })` then it will be called, otherwise data will be stored in an internal buffer, where it can be retrieved with `X.read()`
     * @param data A string containing one or more characters of received data
     */
    on(event: 'data', callback: (data: string) => void): void
  
    /**
     * Return how many bytes are available to read. If there is already a listener for data, this will always return 0.
     */
    available(): number
  
    /**
     * Pipe this to a stream (an object with a 'write' method)
     * @param destination The destination file/stream that will receive content from the source.
     * @param options An optional object `{ chunkSize : int=32, end : bool=true, complete : function }`,chunkSize : The amount of data to pipe from source to destination at a time,complete : a function to call when the pipe activity is complete,end : call the 'end' function on the destination when the source is finished
     */
    pipe(destination: any, options: any): void
  
    /**
     * Return a string containing characters that have been received
     * @param chars The number of characters to read, or undefined/0 for all available
     */
    read(chars: number): any
  }
  
  /**
   * The HTTP server response
   */
  export class httpSRs {
    /**
     * The headers to send back along with the HTTP response.
     * 
     * The default contents are:
     * 
     * ```
     * {
     *   "Connection": "close"
     *  }
     * ```
     */
    headers: any
  
    /**
     * Called when the connection closes.
     */
    on(event: 'close', callback: () => void): void
  
    /**
     * An event that is fired when the buffer is empty and it can accept more data to send.
     */
    on(event: 'drain', callback: () => void): void
  
    /**
     * See `Socket.write` for more information about the data argument
     * @param data A string containing data to send
     */
    end(data: any): void
  
    /**
     * Set a value to send in the header of this HTTP response. This updates the `httpSRs.headers` property.
     * 
     * Any headers supplied to `writeHead` will overwrite any headers with the same name.
     * @param name The name of the header as a String
     * @param value The value of the header as a String
     */
    setHeader(name: any, value: any): void
  
    /**
     * This function writes the `data` argument as a string. Data that is passed in
     * (including arrays) will be converted to a string with the normal JavaScript
     * `toString` method. For more information about sending binary data see `Socket.write`
     * @param data A string containing data to send
     */
    write(data: any): boolean
  
    /**
     * Send the given status code and headers. If not explicitly called
     * this will be done automatically the first time data is written
     * to the response.
     * 
     * This cannot be called twice, or after data has already been sent
     * in the response.
     * @param statusCode The HTTP status code
     * @param headers An object containing the headers
     */
    writeHead(statusCode: int32, headers: any): void
  }
  
  /**
   * The HTTP client request, returned by `http.request()` and `http.get()`.
   */
  export class httpCRq {
    /**
     * An event that is fired when the buffer is empty and it can accept more data to send.
     */
    on(event: 'drain', callback: () => void): void
  
    /**
     * An event that is fired if there is an error making the request and the response callback has not been invoked. In this case the error event concludes the request attempt. The error event function receives an error object as parameter with a `code` field and a `message` field.
     */
    on(event: 'error', callback: () => void): void
  
    /**
     * Finish this HTTP request - optional data to append as an argument
     * 
     * See `Socket.write` for more information about the data argument
     * @param data A string containing data to send
     */
    end(data: any): void
  
    /**
     * This function writes the `data` argument as a string. Data that is passed in
     * (including arrays) will be converted to a string with the normal JavaScript
     * `toString` method. For more information about sending binary data see `Socket.write`
     * @param data A string containing data to send
     */
    write(data: any): boolean
  }
  
  /**
   * The HTTP client response, passed to the callback of `http.request()` an `http.get()`.
   */
  export class httpCRs {
    /**
     * The headers received along with the HTTP response
     */
    headers: any
  
    /**
     * The HTTP version reported back by the server - usually `"1.1"`
     */
    httpVersion: any
  
    /**
     * The HTTP response's status code - usually `"200"` if all went well
     */
    statusCode: any
  
    /**
     * The HTTP response's status message - Usually `"OK"` if all went well
     */
    statusMessage: any
  
    /**
     * Called when the connection closes with one `hadError` boolean parameter, which indicates whether an error occurred.
     */
    on(event: 'close', callback: () => void): void
  
    /**
     * The 'data' event is called when data is received. If a handler is defined with `X.on('data', function(data) { ... })` then it will be called, otherwise data will be stored in an internal buffer, where it can be retrieved with `X.read()`
     * @param data A string containing one or more characters of received data
     */
    on(event: 'data', callback: (data: string) => void): void
  
    /**
     * An event that is fired if there is an error receiving the response. The error event function receives an error object as parameter with a `code` field and a `message` field. After the error event the close even will also be triggered to conclude the HTTP request/response.
     */
    on(event: 'error', callback: (error:{code:number,message:string}) => void): void
  
    /**
     * Return how many bytes are available to read. If there is a 'data' event handler, this will always return 0.
     */
    available(): number
  
    /**
     * Pipe this to a stream (an object with a 'write' method)
     * @param destination The destination file/stream that will receive content from the source.
     * @param options An optional object `{ chunkSize : int=32, end : bool=true, complete : function }`,chunkSize : The amount of data to pipe from source to destination at a time,complete : a function to call when the pipe activity is complete,end : call the 'end' function on the destination when the source is finished
     */
    pipe(destination: any, options: any): void
  
    /**
     * Return a string containing characters that have been received
     * @param chars The number of characters to read, or undefined/0 for all available
     */
    read(chars: number): any
  }
}


/**
 * Library that initialises a network device that calls into JavaScript
 */
declare module "NetworkJS" {
  /**
   * Library that initialises a network device that calls into JavaScript
   */
  export = class NetworkJS {
    /**
     * Initialise the network using the callbacks given and return the first argument. For instance:
     * 
     * ```
     * require("NetworkJS").create({
     *   create : function(host, port, socketType, options) {
     *     // Create a socket and return its index, host is a string, port is an integer.
     *     // If host isn't defined, create a server socket
     *     console.log("Create",host,port);
     *     return 1;
     *   },
     *   close : function(sckt) {
     *     // Close the socket. returns nothing
     *   },
     *   accept : function(sckt) {
     *     // Accept the connection on the server socket. Returns socket number or -1 if no connection
     *     return -1;
     *   },
     *   recv : function(sckt, maxLen, socketType) {
     *     // Receive data. Returns a string (even if empty).
     *     // If non-string returned, socket is then closed
     *     return null;//or "";
     *   },
     *   send : function(sckt, data, socketType) {
     *     // Send data (as string). Returns the number of bytes sent - 0 is ok.
     *     // Less than 0
     *     return data.length;
     *   }
     * });
     * ```
     * 
     * `socketType` is an integer - 2 for UDP, or see SocketType in https://github.com/espruino/Espruino/blob/master/libs/network/network.h
     * for more information.
     * @param obj An object containing functions to access the network device
     */
    static create(obj: any): any
  }
}


/**
 * This library allows you to create TCPIP servers and clients
 * 
 * In order to use this, you will need an extra module to get network connectivity.
 * 
 * This is designed to be a cut-down version of the [node.js library](http://nodejs.org/api/net.html). Please see the [Internet](/Internet) page for more information on how to use it.
 */
declare module "net" {
  /**
   * This library allows you to create TCPIP servers and clients
   * 
   * In order to use this, you will need an extra module to get network connectivity.
   * 
   * This is designed to be a cut-down version of the [node.js library](http://nodejs.org/api/net.html). Please see the [Internet](/Internet) page for more information on how to use it.
   */
  export = class net {
    /**
     * Create a TCP socket connection
     * @param options An object containing host,port fields
     * @param callback A `function(sckt)` that will be called  with the socket when a connection is made. You can then call `sckt.write(...)` to send data, and `sckt.on('data', function(data) { ... })` and `sckt.on('close', function() { ... })` to deal with the response.
     */
    static connect(options: any, callback: any): Socket
  
    /**
     * Create a Server
     * 
     * When a request to the server is made, the callback is called. In the callback you can use the methods on the connection to send data. You can also add `connection.on('data',function() { ... })` to listen for received data
     * @param callback A `function(connection)` that will be called when a connection is made
     */
    static createServer(callback: any): Server
  }
  
  /**
   * The socket server created by `require('net').createServer`
   */
  export class Server {
    /**
     * Stop listening for new connections
     */
    close(): void
  
    /**
     * Start listening for new connections on the given port
     * @param port The port to listen on
     */
    listen(port: int32): any
  }
  
  /**
   * An actual socket connection - allowing transmit/receive of TCP data
   */
  export class Socket {
    /**
     * Called when the connection closes.
     * @param had_error A boolean indicating whether the connection had an error (use an error event handler to get error details).
     */
    on(event: 'close', callback: (had_error: boolean) => void): void
  
    /**
     * The 'data' event is called when data is received. If a handler is defined with `X.on('data', function(data) { ... })` then it will be called, otherwise data will be stored in an internal buffer, where it can be retrieved with `X.read()`
     * @param data A string containing one or more characters of received data
     */
    on(event: 'data', callback: (data: string) => void): void
  
    /**
     * An event that is fired when the buffer is empty and it can accept more data to send.
     */
    on(event: 'drain', callback: () => void): void
  
    /**
     * There was an error on this socket and it is closing (or wasn't opened in the first place). If a "connected" event was issued on this socket then the error event is always followed by a close event.
     * The error codes are:
     * 
     * * -1: socket closed (this is not really an error and will not cause an error callback)
     * * -2: out of memory (typically while allocating a buffer to hold data)
     * * -3: timeout
     * * -4: no route
     * * -5: busy
     * * -6: not found (DNS resolution)
     * * -7: max sockets (... exceeded)
     * * -8: unsent data (some data could not be sent)
     * * -9: connection reset (or refused)
     * * -10: unknown error
     * * -11: no connection
     * * -12: bad argument
     * * -13: SSL handshake failed
     * * -14: invalid SSL data
     * @param details An error object with an error code (a negative integer) and a message.
     */
    on(event: 'error', callback: (details: {code:number,message:string}) => void): void
  
    /**
     * Return how many bytes are available to read. If there is already a listener for data, this will always return 0.
     */
    available(): number
  
    /**
     * Close this socket - optional data to append as an argument.
     * 
     * See `Socket.write` for more information about the data argument
     * @param data A string containing data to send
     */
    end(data: any): void
  
    /**
     * Pipe this to a stream (an object with a 'write' method)
     * @param destination The destination file/stream that will receive content from the source.
     * @param options An optional object `{ chunkSize : int=32, end : bool=true, complete : function }`,chunkSize : The amount of data to pipe from source to destination at a time,complete : a function to call when the pipe activity is complete,end : call the 'end' function on the destination when the source is finished
     */
    pipe(destination: any, options: any): void
  
    /**
     * Return a string containing characters that have been received
     * @param chars The number of characters to read, or undefined/0 for all available
     */
    read(chars: number): any
  
    /**
     * This function writes the `data` argument as a string. Data that is passed in
     * (including arrays) will be converted to a string with the normal JavaScript
     * `toString` method.
     * 
     * If you wish to send binary data then you need to convert that data directly to a
     * String. This can be done with `String.fromCharCode`, however it's often easier
     * and faster to use the Espruino-specific `E.toString`, which will read its arguments
     * as an array of bytes and convert that to a String:
     * 
     * ```
     * socket.write(E.toString([0,1,2,3,4,5]));
     * ```
     * 
     * If you need to send something other than bytes, you can use 'Typed Arrays', or
     * even `DataView`:
     * 
     * ```
     * var d = new DataView(new ArrayBuffer(8)); // 8 byte array buffer
     * d.setFloat32(0, 765.3532564); // write float at bytes 0-3
     * d.setInt8(4, 42); // write int8 at byte 4
     * socket.write(E.toString(d.buffer))
     * ```
     * @param data A string containing data to send
     */
    write(data: any): boolean
  }
}


/**
 * This library allows you to create UDP/DATAGRAM servers and clients
 * 
 * In order to use this, you will need an extra module to get network connectivity.
 * 
 * This is designed to be a cut-down version of the [node.js library](http://nodejs.org/api/dgram.html). Please see the [Internet](/Internet) page for more information on how to use it.
 */
declare module "dgram" {
  /**
   * This library allows you to create UDP/DATAGRAM servers and clients
   * 
   * In order to use this, you will need an extra module to get network connectivity.
   * 
   * This is designed to be a cut-down version of the [node.js library](http://nodejs.org/api/dgram.html). Please see the [Internet](/Internet) page for more information on how to use it.
   */
  export = class dgram {
    /**
     * Create a UDP socket
     * @param type Socket type to create e.g. 'udp4'. Or options object { type: 'udp4', reuseAddr: true, recvBufferSize: 1024 }
     * @param callback A `function(sckt)` that will be called  with the socket when a connection is made. You can then call `sckt.send(...)` to send data, and `sckt.on('message', function(data) { ... })` and `sckt.on('close', function() { ... })` to deal with the response.
     */
    static createSocket(type: any, callback: any): dgramSocket
  }
  
  /**
   * An actual socket connection - allowing transmit/receive of TCP data
   */
  export class dgramSocket {
    /**
     * Called when the connection closes.
     * @param had_error A boolean indicating whether the connection had an error (use an error event handler to get error details).
     */
    on(event: 'close', callback: (had_error: boolean) => void): void
  
    /**
     * The 'message' event is called when a datagram message is received. If a handler is defined with `X.on('message', function(msg) { ... })` then it will be called`
     * @param msg A string containing the received message
     * @param rinfo Sender address,port containing information
     */
    on(event: 'message', callback: (msg: string, rinfo: {address:string,port:number,size:number}) => void): void
  
    /**
     * @param group A string containing the group ip to join
     * @param ip A string containing the ip to join with
     */
    addMembership(group: any, ip: any): void
  
    /**
     * @param port The port to bind at
     * @param callback A function(res) that will be called when the socket is bound. You can then call `res.on('message', function(message, info) { ... })` and `res.on('close', function() { ... })` to deal with the response.
     */
    bind(port: int32, callback: any): any
  
    /**
     * Close the socket
     */
    close(): void
  
    /**
     * @param buffer A string containing message to send
     * @param offset Offset in the passed string where the message starts [optional]
     * @param length Number of bytes in the message [optional]
     * @param args Destination port number, Destination IP address string
     */
    send(buffer: any, offset: any, length: any, args: JsVarArray): void
  }
}


/**
 * This library allows you to create TCPIP servers and clients using TLS encryption
 * 
 * In order to use this, you will need an extra module to get network connectivity.
 * 
 * This is designed to be a cut-down version of the [node.js library](http://nodejs.org/api/tls.html). Please see the [Internet](/Internet) page for more information on how to use it.
 */
declare module "tls" {
  /**
   * This library allows you to create TCPIP servers and clients using TLS encryption
   * 
   * In order to use this, you will need an extra module to get network connectivity.
   * 
   * This is designed to be a cut-down version of the [node.js library](http://nodejs.org/api/tls.html). Please see the [Internet](/Internet) page for more information on how to use it.
   */
  export = class tls {
    /**
     * Create a socket connection using TLS
     * 
     * Options can have `ca`, `key` and `cert` fields, which should be the decoded content of the certificate.
     * 
     * ```
     * var options = url.parse("localhost:1234");
     * options.key = atob("MIIJKQ ... OZs08C");
     * options.cert = atob("MIIFi ... Uf93rN+");
     * options.ca = atob("MIIFgDCC ... GosQML4sc=");
     * require("tls").connect(options, ... );
     * ```
     * 
     * If you have the certificates as `.pem` files, you need to load these files, take the information between the lines beginning with `----`, remove the newlines from it so you have raw base64, and then feed it into `atob` as above.
     * 
     * You can also:
     * * Just specify the filename (<=100 characters) and it will be loaded and parsed if you have an SD card connected. For instance `options.key = "key.pem";`
     * * Specify a function, which will be called to retrieve the data.  For instance `options.key = function() { eeprom.load_my_info(); };
     * 
     * For more information about generating and using certificates, see:
     * 
     * https://engineering.circle.com/https-authorized-certs-with-node-js/
     * 
     * (You'll need to use 2048 bit certificates as opposed to 4096 bit shown above)
     * @param options An object containing host,port fields
     * @param callback A function(res) that will be called when a connection is made. You can then call `res.on('data', function(data) { ... })` and `res.on('close', function() { ... })` to deal with the response.
     */
    static connect(options: any, callback: any): Socket
  }
}


/**
 * This library implements a telnet console for the Espruino interpreter. It requires a network
 * connection, e.g. Wifi, and **currently only functions on the ESP8266 and on Linux **. It uses
 * port 23 on the ESP8266 and port 2323 on Linux.
 * 
 * **Note:** To enable on Linux, run `./espruino --telnet`
 */
declare module "TelnetServer" {
  /**
   * This library implements a telnet console for the Espruino interpreter. It requires a network
   * connection, e.g. Wifi, and **currently only functions on the ESP8266 and on Linux **. It uses
   * port 23 on the ESP8266 and port 2323 on Linux.
   * 
   * **Note:** To enable on Linux, run `./espruino --telnet`
   */
  export = class TelnetServer {
    /**
     * @param options Options controlling the telnet console server `{ mode : 'on|off'}`
     */
    static setOptions(options: any): void
  }
}


/**
 * Library for communication with the WIZnet Ethernet module
 */
declare module "WIZnet" {
  /**
   * Library for communication with the WIZnet Ethernet module
   */
  export = class WIZnet {
    /**
     * Initialise the WIZnet module and return an Ethernet object
     * @param spi Device to use for SPI (or undefined to use the default)
     * @param cs The pin to use for Chip Select
     */
    static connect(spi: any, cs: Pin): Ethernet
  }
}



declare module "tensorflow" {
  
  export = class tensorflow {
    /**
     * @param arenaSize The TensorFlow Arena size
     * @param model The model to use - this should be a flat array/string
     */
    static create(arenaSize: number, model: any): TFMicroInterpreter
  }
  
  /**
   * Class containing an instance of TFMicroInterpreter
   */
  export class TFMicroInterpreter {
    /**
     */
    getInput(): ArrayBufferView
  
    /**
     */
    getOutput(): ArrayBufferView
  
    /**
     */
    invoke(): void
  }
}


/**
 * This library provides TV out capability on the Espruino and Espruino Pico.
 * 
 * See the [Television](/Television) page for more information.
 */
declare module "tv" {
  /**
   * This library provides TV out capability on the Espruino and Espruino Pico.
   * 
   * See the [Television](/Television) page for more information.
   */
  export = class tv {
    /**
     * This initialises the TV output. Options for PAL are as follows:
     * 
     * ```
     * var g = require('tv').setup({ type : "pal",
     *   video : A7, // Pin - SPI MOSI Pin for Video output (MUST BE SPI1)
     *   sync : A6, // Pin - Timer pin to use for video sync
     *   width : 384,
     *   height : 270, // max 270
     * });
     * ```
     * 
     * and for VGA:
     * 
     * ```
     * var g = require('tv').setup({ type : "vga",
     *   video : A7, // Pin - SPI MOSI Pin for Video output (MUST BE SPI1)
     *   hsync : A6, // Pin - Timer pin to use for video sync
     *   vsync : A5, // Pin - pin to use for video sync
     *   width : 220,
     *   height : 240,
     *   repeat : 2, // amount of times to repeat each line
     * });
     * ```
     * 
     * or
     * 
     * ```
     * var g = require('tv').setup({ type : "vga",
     *   video : A7, // Pin - SPI MOSI Pin for Video output (MUST BE SPI1)
     *   hsync : A6, // Pin - Timer pin to use for video sync
     *   vsync : A5, // Pin - pin to use for video sync
     *   width : 220,
     *   height : 480,
     *   repeat : 1, // amount of times to repeat each line
     * });
     * ```
     * 
     * See the [Television](/Television) page for more information.
     * @param options Various options for the TV output
     * @param width 
     */
    static setup(options: any, width: number): any
  }
}


/**
 * This module allows you to read and write the nonvolatile flash memory of your device.
 * 
 * Also see the `Storage` library, which provides a safer file-like
 * interface to nonvolatile storage.
 * 
 * It should be used with extreme caution, as it is easy to overwrite parts of Flash
 * memory belonging to Espruino or even its bootloader. If you damage the bootloader
 * then you may need external hardware such as a USB-TTL converter to restore it. For
 * more information on restoring the bootloader see `Advanced Reflashing` in your
 * board's reference pages.
 * 
 * To see which areas of memory you can and can't overwrite, look at the values
 * reported by `process.memory()`.
 * 
 * **Note:** On Nordic platforms there are checks in place to help you avoid
 * 'bricking' your device be damaging the bootloader. You can disable these with `E.setFlags({unsafeFlash:1})`
 */
declare module "Flash" {
  /**
   * This module allows you to read and write the nonvolatile flash memory of your device.
   * 
   * Also see the `Storage` library, which provides a safer file-like
   * interface to nonvolatile storage.
   * 
   * It should be used with extreme caution, as it is easy to overwrite parts of Flash
   * memory belonging to Espruino or even its bootloader. If you damage the bootloader
   * then you may need external hardware such as a USB-TTL converter to restore it. For
   * more information on restoring the bootloader see `Advanced Reflashing` in your
   * board's reference pages.
   * 
   * To see which areas of memory you can and can't overwrite, look at the values
   * reported by `process.memory()`.
   * 
   * **Note:** On Nordic platforms there are checks in place to help you avoid
   * 'bricking' your device be damaging the bootloader. You can disable these with `E.setFlags({unsafeFlash:1})`
   */
  export = class Flash {
    /**
     * Erase a page of flash memory
     * @param addr An address in the page that is to be erased
     */
    static erasePage(addr: any): void
  
    /**
     * This method returns an array of objects of the form `{addr : #, length : #}`, representing
     * contiguous areas of flash memory in the chip that are not used for anything.
     * 
     * The memory areas returned are on page boundaries. This means that you can
     * safely erase the page containing any address here, and you won't risk
     * deleting part of the Espruino firmware.
     */
    static getFree(): any
  
    /**
     * Returns the start and length of the flash page containing the given address.
     * @param addr An address in memory
     */
    static getPage(addr: number): any
  
    /**
     * Read flash memory from the given address
     * @param length The amount of data to read (in bytes)
     * @param addr The address to start reading from
     */
    static read(length: number, addr: number): any
  
    /**
     * Write data into memory at the given address
     * 
     * In flash memory you may only turn bits that are 1 into bits that are 0. If
     * you're writing data into an area that you have already written (so `read`
     * doesn't return all `0xFF`) you'll need to call `erasePage` to clear the
     * entire page.
     * @param data The data to write
     * @param addr The address to start writing from
     */
    static write(data: any, addr: number): void
  }
}


/**
 * This module allows you to read and write part of the nonvolatile flash
 * memory of your device using a filesystem-like API.
 * 
 * Also see the `Flash` library, which provides a low level, more dangerous way
 * to access all parts of your flash memory.
 * 
 * The `Storage` library provides two distinct types of file:
 * 
 * * `require("Storage").write(...)`/`require("Storage").read(...)`/etc create simple
 * contiguous files of fixed length. This is the recommended file type.
 * * `require("Storage").open(...)` creates a `StorageFile`, which stores the file in
 * numbered chunks (`"filename\1"`/`"filename\2"`/etc). It allows data to be appended
 * and for the file to be read line by line.
 * 
 * You must read a file using the same method you used to write it - eg. you can't create a
 * file with `require("Storage").open(...)` and then read it with `require("Storage").read(...)`.
 * 
 * **Note:** In firmware 2v05 and later, the maximum length for filenames
 * is 28 characters. However in 2v04 and earlier the max length is 8.
 */
declare module "Storage" {
  /**
   * This module allows you to read and write part of the nonvolatile flash
   * memory of your device using a filesystem-like API.
   * 
   * Also see the `Flash` library, which provides a low level, more dangerous way
   * to access all parts of your flash memory.
   * 
   * The `Storage` library provides two distinct types of file:
   * 
   * * `require("Storage").write(...)`/`require("Storage").read(...)`/etc create simple
   * contiguous files of fixed length. This is the recommended file type.
   * * `require("Storage").open(...)` creates a `StorageFile`, which stores the file in
   * numbered chunks (`"filename\1"`/`"filename\2"`/etc). It allows data to be appended
   * and for the file to be read line by line.
   * 
   * You must read a file using the same method you used to write it - eg. you can't create a
   * file with `require("Storage").open(...)` and then read it with `require("Storage").read(...)`.
   * 
   * **Note:** In firmware 2v05 and later, the maximum length for filenames
   * is 28 characters. However in 2v04 and earlier the max length is 8.
   */
  export = class Storage {
    /**
     * The Flash Storage system is journaling. To make the most of the limited
     * write cycles of Flash memory, Espruino marks deleted/replaced files as
     * garbage and moves on to a fresh part of flash memory. Espruino only
     * fully erases those files when it is running low on flash, or when
     * `compact` is called.
     * 
     * `compact` may fail if there isn't enough RAM free on the stack to
     * use as swap space, however in this case it will not lose data.
     * 
     * **Note:** `compact` rearranges the contents of memory. If code is
     * referencing that memory (eg. functions that have their code stored in flash)
     * then they may become garbled when compaction happens. To avoid this,
     * call `eraseFiles` before uploading data that you intend to reference to
     * ensure that uploaded files are right at the start of flash and cannot be
     * compacted further.
     */
    static compact(): void
  
    /**
     * This writes information about all blocks in flash
     * memory to the console - and is only useful for debugging
     * flash storage.
     */
    static debug(): void
  
    /**
     * Erase a single file from the flash storage area.
     * 
     * **Note:** This function should be used with normal files, and not
     * `StorageFile`s created with `require("Storage").open(filename, ...)`
     * @param name The filename - max 28 characters (case sensitive)
     */
    static erase(name: any): void
  
    /**
     * Erase the flash storage area. This will remove all files
     * created with `require("Storage").write(...)` as well
     * as any code saved with `save()` or `E.setBootCode()`.
     */
    static eraseAll(): void
  
    /**
     * Return the amount of free bytes available in
     * Storage. Due to fragmentation there may be more
     * bytes available, but this represents the maximum
     * size of file that can be written.
     */
    static getFree(): number
  
    /**
     * Returns:
     * 
     * ```
     * {
     *   totalBytes // Amount of bytes in filesystem
     *   freeBytes // How many bytes are left at the end of storage?
     *   fileBytes // How many bytes of allocated files do we have?
     *   fileCount // How many allocated files do we have?
     *   trashBytes // How many bytes of trash files do we have?
     *   trashCount // How many trash files do we have?
     * }
     * ```
     */
    static getStats(): any
  
    /**
     * List all files in the flash storage area matching the specfied regex (ignores StorageFiles),
     * and then hash their filenames *and* file locations.
     * 
     * Identical files may have different hashes (eg. if Storage is compacted and the file moves) but
     * the changes of different files having the same hash are extremely small.
     * 
     * ```
     * // Hash files
     * require("Storage").hash()
     * // Files ending in '.boot.js'
     * require("Storage").hash(/\.boot\.js$/)
     * ```
     * 
     * **Note:** This function is used by Bangle.js as a way to cache files.
     * For instance the bootloader will add all `.boot.js` files together into
     * a single `.boot0` file, but it needs to know quickly whether anything has
     * changed.
     * @param regex (optional) If supplied, filenames are checked against this regular expression (with `String.match(regexp)`) to see if they match before being hashed
     */
    static hash(regex: any): number
  
    /**
     * List all files in the flash storage area. An array of Strings is returned.
     * 
     * By default this lists files created by `StorageFile` (`require("Storage").open`)
     * which have a file number (`"\1"`/`"\2"`/etc) appended to them.
     * 
     * ```
     * // All files
     * require("Storage").list()
     * // Files ending in '.js'
     * require("Storage").list(/\.js$/)
     * // All Storage Files
     * require("Storage").list(undefined, {sf:true})
     * // All normal files (eg created with Storage.write)
     * require("Storage").list(undefined, {sf:false})
     * ```
     * 
     * **Note:** This will output system files (eg. saved code) as well as
     * files that you may have written.
     * @param regex (optional) If supplied, filenames are checked against this regular expression (with `String.match(regexp)`) to see if they match before being returned
     * @param filter (optional) If supplied, File Types are filtered based on this: `{sf:true}` or `{sf:false}` for whether to show StorageFile
     */
    static list(regex: any, filter: any): any
  
    /**
     * Open a file in the Storage area. This can be used for appending data
     * (normal read/write operations only write the entire file).
     * 
     * Please see `StorageFile` for more information (and examples).
     * 
     * **Note:** These files write through immediately - they do not need closing.
     * @param name The filename - max **27** characters (case sensitive)
     * @param mode The open mode - must be either `'r'` for read,`'w'` for write , or `'a'` for append
     */
    static open(name: any, mode: any): StorageFile
  
    /**
     * Read a file from the flash storage area that has
     * been written with `require("Storage").write(...)`.
     * 
     * This function returns a memory-mapped String that points to the actual
     * memory area in read-only memory, so it won't use up RAM.
     * 
     * As such you can check if a file exists efficiently using `require("Storage").read(filename)!==undefined`.
     * 
     * If you evaluate this string with `eval`, any functions
     * contained in the String will keep their code stored
     * in flash memory.
     * 
     * **Note:** This function should be used with normal files, and not
     * `StorageFile`s created with `require("Storage").open(filename, ...)`
     * @param name The filename - max 28 characters (case sensitive)
     * @param offset (optional) The offset in bytes to start from
     * @param length (optional) The length to read in bytes (if <=0, the entire file is read)
     */
    static read(name: any, offset: number, length: number): any
  
    /**
     * Read a file from the flash storage area that has
     * been written with `require("Storage").write(...)`,
     * and return the raw binary data as an ArrayBuffer.
     * 
     * This can be used:
     * 
     * * In a `DataView` with `new DataView(require("Storage").readArrayBuffer("x"))`
     * * In a `Uint8Array/Float32Array/etc` with `new Uint8Array(require("Storage").readArrayBuffer("x"))`
     * 
     * **Note:** This function should be used with normal files, and not
     * `StorageFile`s created with `require("Storage").open(filename, ...)`
     * @param name The filename - max 28 characters (case sensitive)
     */
    static readArrayBuffer(name: any): any
  
    /**
     * Read a file from the flash storage area that has
     * been written with `require("Storage").write(...)`,
     * and parse JSON in it into a JavaScript object.
     * 
     * This is identical to `JSON.parse(require("Storage").read(...))`.
     * It will throw an exception if the data in the file is not
     * valid JSON.
     * 
     * **Note:** This function should be used with normal files, and not
     * `StorageFile`s created with `require("Storage").open(filename, ...)`
     * @param name The filename - max 28 characters (case sensitive)
     * @param noExceptions If true and the JSON is not valid, just return `undefined` - otherwise an `Exception` is thrown
     */
    static readJSON(name: any, noExceptions: boolean): any
  
    /**
     * Write/create a file in the flash storage area. This is
     * nonvolatile and will not disappear when the device resets
     * or power is lost.
     * 
     * Simply write `require("Storage").write("MyFile", "Some data")` to write
     * a new file, and `require("Storage").read("MyFile")` to read it.
     * 
     * If you supply:
     * 
     * * A String, it will be written as-is
     * * An array, will be written as a byte array (but read back as a String)
     * * An object, it will automatically be converted to
     * a JSON string before being written.
     * 
     * **Note:** If an array is supplied it will not be converted to JSON.
     * To be explicit about the conversion you can use `Storage.writeJSON`
     * 
     * You may also create a file and then populate data later **as long as you
     * don't try and overwrite data that already exists**. For instance:
     * 
     * ```
     * var f = require("Storage");
     * f.write("a","Hello",0,14);
     * f.write("a"," ",5);
     * f.write("a","World!!!",6);
     * print(f.read("a")); // "Hello World!!!"
     * f.write("a"," ",0); // Writing to location 0 again will cause the file to be re-written
     * print(f.read("a")); // " "
     * ```
     * 
     * This can be useful if you've got more data to write than you
     * have RAM available - for instance the Web IDE uses this method
     * to write large files into onboard storage.
     * 
     * **Note:** This function should be used with normal files, and not
     * `StorageFile`s created with `require("Storage").open(filename, ...)`
     * @param name The filename - max 28 characters (case sensitive)
     * @param data The data to write
     * @param offset [optional] The offset within the file to write
     * @param size [optional] The size of the file (if a file is to be created that is bigger than the data)
     */
    static write(name: any, data: any, offset: number, size: number): boolean
  
    /**
     * Write/create a file in the flash storage area. This is
     * nonvolatile and will not disappear when the device resets
     * or power is lost.
     * 
     * Simply write `require("Storage").writeJSON("MyFile", [1,2,3])` to write
     * a new file, and `require("Storage").readJSON("MyFile")` to read it.
     * 
     * This is equivalent to: `require("Storage").write(name, JSON.stringify(data))`
     * 
     * **Note:** This function should be used with normal files, and not
     * `StorageFile`s created with `require("Storage").open(filename, ...)`
     * @param name The filename - max 28 characters (case sensitive)
     * @param data The JSON data to write
     */
    static writeJSON(name: any, data: any): boolean
  }
}

