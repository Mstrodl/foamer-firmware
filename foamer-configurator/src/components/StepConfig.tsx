import type { Steps } from "../stores/configStore";
import { setConfig, useConfig } from "../stores/configStore";

export function StepConfig({ profileId }: { profileId: number }) {
    const steps = useConfig((config) => config.profiles[profileId].steps);

    return steps.map((_, index) => (
        <StepConfigEntry key={index} index={index} profileId={profileId} />
    ));
}

function StepConfigEntry({
    index,
    profileId,
}: {
    index: number;
    profileId: number;
}) {
    const stepConfig = useConfig((config) => config.profiles[profileId].steps);

    const setStepConfig = (sentinel: (step: Steps) => Steps) => {
        setConfig((config) => {
            config = structuredClone(config);
            const oldStep = config.profiles[profileId].steps;
            const newStep = sentinel(oldStep);
            config.profiles[profileId].steps = newStep;
            return config;
        });
    };

    const notchString = `notch-${index}`;

    if (index !== 0) {
        return (
            <label
                htmlFor={notchString}
                className="block text-sm 
                font-semibold text-[var(--sea-ink)]"
            >
                Notch {index} Speed Step:
                <input
                    name={notchString}
                    id={notchString}
                    type="number"
                    className="my-2 demo-input"
                    value={stepConfig[index]}
                    min={0}
                    max={126}
                    onChange={(event) => {
                        setStepConfig((_) => {
                            const newStep = structuredClone(
                                stepConfig,
                            ) as Steps;
                            newStep[index] = parseInt(event.target.value, 10);
                            return newStep;
                        });
                    }}
                />
            </label>
        );
    }
}
