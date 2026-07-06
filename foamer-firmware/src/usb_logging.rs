use defmtusb as _;
use embassy_executor::Spawner;
use embassy_rp::peripherals::USB;
use embassy_rp::usb::Driver as RpDriver;
use embassy_usb::Builder;
use embassy_usb::class::cdc_acm::{CdcAcmClass, Sender, State};
use static_cell::StaticCell;

#[embassy_executor::task]
async fn usb_log_task(sender: Sender<'static, RpDriver<'static, USB>>) -> ! {
    defmtusb::logger(sender, 64).await
}

pub(crate) fn init(spawner: &Spawner, builder: &mut Builder<'static, RpDriver<'static, USB>>) {
    static STATE: StaticCell<State<'static>> = StaticCell::new();
    let cdc = CdcAcmClass::new(builder, STATE.init(Default::default()), 64);
    spawner.spawn(defmt::unwrap!(usb_log_task(cdc.split().0)));
}
