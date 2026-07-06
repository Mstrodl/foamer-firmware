import { AddressSelector } from "../components/AddressSelector";
import { MU_COUNT, setConfig, useConfig } from "../stores/configStore";

export function Consist({ profileId }: { profileId: number }) {
    const locomotives = useConfig(
        (config) => config.profiles[profileId].locomotives,
    );

    return (
        <div>
            {locomotives.map((_, locomotiveId) => (
                <div
                    key={locomotiveId}
                    className="flex flex-col md:flex-row md:gap-4"
                >
                    <div className="flex-1">
                        <AddressSelector
                            value={locomotives[locomotiveId]}
                            onChange={(value) =>
                                setConfig((config) => {
                                    config = structuredClone(config);
                                    config.profiles[profileId].locomotives[
                                        locomotiveId
                                    ] = value;
                                    return config;
                                })
                            }
                        />
                    </div>
                    <div className="flex justify-end flex-col">
                        <label>
                            <button
                                type="button"
                                className="demo-button-input text-sm my-2"
                                onClick={() => {
                                    setConfig((config) => {
                                        config = structuredClone(config);
                                        config.profiles[
                                            profileId
                                        ].locomotives.splice(locomotiveId, 1);
                                        return config;
                                    });
                                }}
                                disabled={locomotives.length <= 1}
                            >
                                Remove
                            </button>
                        </label>
                    </div>
                </div>
            ))}
            <button
                type="button"
                className="demo-button"
                onClick={() => {
                    setConfig((config) => {
                        config = structuredClone(config);
                        config.profiles[profileId].locomotives.push({
                            address: {
                                Long: 0x6969,
                            },
                            invert_direction: false,
                        });
                        return config;
                    });
                }}
                disabled={locomotives.length >= MU_COUNT}
            >
                Add Unit
            </button>
        </div>
    );
}
