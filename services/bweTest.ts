const log = console.log

export async function getCharacteristics(device: BluetoothDevice) {

    log('Connecting to GATT Server...');
    const gattServer = await device?.gatt?.connect();

    log('Getting Services...');
    const services = await gattServer?.getPrimaryServices(asString);

    if (services) {
        for (var service of services) {
            const characteristics = await service?.getCharacteristics();

            if (!characteristics) return;

            for (var characteristic of characteristics) {
                log(JSON.stringify(characteristic.properties, null, 4))
                log('> Characteristic UUID:  ' + characteristic.uuid);
                log('> Broadcast:            ' + characteristic.properties.broadcast);
                log('> Read:                 ' + characteristic.properties.read);
                log('> Write w/o response:   ' +
                    characteristic.properties.writeWithoutResponse);
                log('> Write:                ' + characteristic.properties.write);
                log('> Notify:               ' + characteristic.properties.notify);
                log('> Indicate:             ' + characteristic.properties.indicate);
                log('> Signed Write:         ' +
                    characteristic.properties.authenticatedSignedWrites);
                log('> Queued Write:         ' + characteristic.properties.reliableWrite);
                log('> Writable Auxiliaries: ' +
                    characteristic.properties.writableAuxiliaries);
            }
        }
    }
}
const asString = parseInt("0x180A");// parseInt("0xFEBE");
export async function getNearbyDevices() {
    navigator.bluetooth.requestDevice({
        // filters: [...] <- Prefer filters to save energy & show relevant devices.
        acceptAllDevices: true,
        optionalServices: [asString]
    })
        .then(async device => {
            console.log('> Requested ' + device.name + ' (' + device.id + ')');

            await getCharacteristics(device);
        })
        .catch(error => {
            console.log('Argh! ' + error);
        });
}

export async function populateBluetoothDevices(): Promise<BluetoothDevice[]> {
    var result: BluetoothDevice[] = [];
    try {
        console.log('Getting existing permitted Bluetooth devices...');

        console.log(await navigator.bluetooth.getAvailability())

        const availableDevices = await navigator.bluetooth.getDevices();
        console.log('> Got ' + availableDevices.length + ' Bluetooth devices.');
        return availableDevices;
    } catch (error) {
        console.error('Argh! ' + error);
    }
    return result;
}