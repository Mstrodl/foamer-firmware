import { setConfig, useConfig } from "../stores/configStore";

export function SpeedCurveConfig({ profileId }: { profileId: number }) {
    const speedCurve = useConfig(
        (config) => config.profiles[profileId].speed_curve,
    );

    return speedCurve.map((_, index) => (
        <SpeedCurveEntry key={index} index={index} profileId={profileId} />
    ));
}

function SpeedCurveEntry({
    index,
    profileId,
}: {
    index: number;
    profileId: number;
}) {
    const speed = useConfig(
        (config) => config.profiles[profileId].speed_curve[index],
    );

    const setSpeed = (speed: number) => {
        setConfig((config) => {
            config = structuredClone(config);
            config.profiles[profileId].speed_curve[index] = speed;
            return config;
        });
    };

    const notchString = `notch-${index}`;

    return (
        <label
            htmlFor={notchString}
            className="block text-sm 
            font-semibold text-[var(--sea-ink)]"
        >
            Speed at Notch {index + 1}:
            <input
                name={notchString}
                id={notchString}
                type="number"
                className="my-2 demo-input"
                value={speed}
                min={0}
                max={126}
                onChange={(event) => {
                    setSpeed(parseInt(event.target.value, 10));
                }}
            />
        </label>
    );
}
