import classNames from 'classnames'

interface StepProgressBarProps {
  current: number
  maxStep: number
}

const StepProgressBar: React.FC<StepProgressBarProps> = ({
  current,
  maxStep,
}) => {
  const steps = Array.from({ length: maxStep }, (_, index) => index + 1)

  const count = current++

  return (
    <div className="flex flex-col items-start gap-2">
      <span className="text-sm text-theme-100">
        Passo {count + 1} de {maxStep}
      </span>

      <ul className="flex flex-wrap items-center w-full gap-2">
        {steps.map((step) => (
          <li key={step} className="flex flex-1">
            <div
              className={classNames(
                'flex-1 h-1 rounded bg-white transition-opacity',
                step === count + 1 ? 'opacity-100' : 'opacity-50',
              )}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StepProgressBar
