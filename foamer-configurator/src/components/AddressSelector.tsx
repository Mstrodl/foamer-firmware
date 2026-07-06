import type { Address, Locomotive } from "../stores/configStore";

export function AddressSelector({
    value,
    onChange,
}: {
    value: Locomotive;
    onChange: (locomotive: Locomotive) => unknown;
}) {
    const address = value.address;
    const type = "Long" in address ? ("Long" as const) : ("Short" as const);
    const addressNumber = "Long" in address ? address.Long : address.Short;

    function onChangeWrapped(locomotive: Locomotive) {
        const address = locomotive.address;
        if ("Long" in address) {
            address.Long &= 0xffff;
        } else if ("Short" in address) {
            address.Short &= 0xff;
        }
        onChange(locomotive);
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">
            <label
                htmlFor="addressType"
                className="block text-sm font-semibold text-[var(--sea-ink)]"
            >
                Locomotive Address Type
                <select
                    name="addressType"
                    id="addressType"
                    className="my-2 demo-select"
                    value={type}
                    onChange={(event) => {
                        onChangeWrapped({
                            ...value,
                            address: {
                                [event.target.value as "Long" | "Short"]:
                                    addressNumber,
                            } as Address,
                        });
                    }}
                >
                    <option value="Long">Long</option>
                    <option value="Short">Short</option>
                </select>
            </label>
            <label
                htmlFor="addressNumber"
                className="block text-sm font-semibold text-[var(--sea-ink)]"
            >
                Address
                <input
                    type="text"
                    name="addressNumber"
                    id="addressNumber"
                    className="my-2 demo-input"
                    value={addressNumber.toString(16)}
                    maxLength={type == "Long" ? 4 : 2}
                    onChange={(event) => {
                        onChangeWrapped({
                            ...value,
                            address: {
                                [type]: parseInt(event.target.value, 16),
                            } as Address,
                        });
                    }}
                />
            </label>
            <label
                htmlFor="locomotiveInvertDirection"
                className="block text-sm font-semibold text-[var(--sea-ink)]"
            >
                Direction
                <select
                    name="locomotiveInvertDirection"
                    id="locomotiveInvertDirection"
                    className="my-2 demo-select"
                    value={value.invert_direction ? "Reversed" : "Normal"}
                    onChange={(event) => {
                        onChangeWrapped({
                            ...value,
                            invert_direction:
                                (event.target.value as "Normal" | "Reversed") ==
                                "Reversed",
                        });
                    }}
                >
                    <option value="Normal">Normal</option>
                    <option value="Reversed">Reversed</option>
                </select>
            </label>
        </div>
    );
}
