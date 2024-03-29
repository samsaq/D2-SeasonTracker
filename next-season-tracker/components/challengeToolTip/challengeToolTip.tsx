import Image from 'next/image';
import type { challengeProps } from '@/atoms';

export default function challengeToolTip(props: challengeProps) {
  //remove unneeded escape characters from the description
  const cleanedDesc = props.description.replace(/\\/g, '');

  //replace any empty objective names with Progress & remove the [] around words within the objectives
  props.objectives.forEach((objective) => {
    if (objective.name === '') {
      objective.name = 'Progress';
    }
    objective.name = objective.name.replace(/[\[\]']+/g, '');
  });

  const progressArray = props.objectives.map((objective) => {
    return parseInt(objective.startValue) / parseInt(objective.completionValue);
  });

  return (
    <div className='flex flex-col items-start shadow-lg'>
      <div className='flex w-full flex-row items-center justify-start bg-secondary-focus p-2'>
        <Image
          src={`/seasonalData/seasonChallengesData/seasonChallengeIcons/${props.icon}`}
          width={21}
          height={21}
          alt='Challenge Icon'
        />
        <span className=' px-1 font-neue text-sm text-white'>{props.name}</span>
      </div>
      <div className='flex w-full flex-col items-start justify-start bg-base-200 p-2'>
        <span className='max-w-sm break-words pb-3 font-neue text-sm text-white'>
          {cleanedDesc}
        </span>
        {props.objectives.map((objective, index) => {
          return (
            /* Using objective.name should be fine since we're not filtering / re-ordering the list */
            <div
              key={objective.name}
              className='flex w-full flex-row justify-start'
            >
              <div className=' flex aspect-square h-6 items-center justify-center border-2 border-solid border-secondary-focus border-opacity-75 bg-transparent'>
                {progressArray[index] === 1 ? (
                  <div className='aspect-square h-3.5 bg-accent opacity-100' />
                ) : (
                  <div className='aspect-square h-3.5 bg-accent opacity-0' />
                )}
              </div>
              <div className='relative ml-2 flex flex-grow flex-row items-center justify-between'>
                <progress
                  className='progress-accent progress h-6'
                  value={objective.startValue}
                  max={objective.completionValue}
                />
                <span className='absolute left-2 font-neue text-sm text-white'>
                  {objective.name}
                </span>
                <span className='absolute right-2 font-neue text-sm text-white'>
                  {objective.startValue}/{objective.completionValue}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
