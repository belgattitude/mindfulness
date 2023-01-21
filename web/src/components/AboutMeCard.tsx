import { clsx } from 'clsx';
import Image from 'next/image';
import type { FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import IconLotus from '@/public/icons/lotus.svg';
import IconMeditation from '@/public/icons/meditation.svg';
import IconYoga from '@/public/icons/yoga.svg';

type CardBoxProps = {
  children: ReactNode;
  className?: string;
};
export const CardBox: FC<CardBoxProps> = (props) => {
  const { className = '', children } = props;

  return (
    <div
      className={twMerge(
        clsx('flex justify-center overflow-hidden'),
        className
      )}
    >
      {children}
    </div>
  );
};

export const AboutMeCard: FC<{ className?: string }> = (props) => {
  const { className = '' } = props;
  return (
    <div
      className={twMerge(
        clsx('px-6 pt-10 pb-8 shadow-xl sm:rounded-lg sm:px-10'),
        className
      )}
    >
      <div className="">
        <Image
          src="/images/sandrine-photo.jpg"
          className=""
          width={800}
          height={800}
          alt={'Photo profil Sandrine'}
        />
      </div>

      <div className={'pt-5 text-2xl font-extralight uppercase leading-8'}>
        Pleine conscience et yoga. Teintée de nature et sa profondeur. Loving
        soul.
      </div>

      <div className="divide-y divide-gray-300/50">
        <div className="space-y-6 py-8 text-base font-normal leading-7 text-neutral-800">
          <p className={'text-3xl font-light'}>Bonjour, à mon propos</p>
          <p>
            Je suis Sandrine Rauter, professeur de Yoga et de pleine conscience
            / mindfuless depuis de nombreuses années. Pour celles et ceux dont
            je n'ai pas encore eu le plaisir de faire connaissance, vous
            trouverez un aperçu de mon parcours ici.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center">
              <IconLotus className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" />
              <p className="ml-4">
                Ateliers et cycles de mindfulness / pleine conscience.
              </p>
            </li>
            <li className="flex items-center">
              <IconYoga className="h-6 w-6 flex-none fill-transparent stroke-sky-100 stroke-2" />
              <p className="ml-4">Classes de yoga en présentiel ou en ligne</p>
            </li>
            <li className="flex items-center">
              <IconMeditation className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" />
              <p className="ml-4">Stages et retraites de yoga et méditation.</p>
            </li>
          </ul>
          <p>
            Un nuage ne meurt jamais. Pour qu'une larme soit éternelle, il
            suffit de la déposer dans une rivère.
          </p>
        </div>
        <div className="pt-8 text-base font-light leading-10">
          <p className="text-gray-900">Liens vers mes formations</p>
          <p>
            <a
              target={'_blank'}
              href="https://www.brusselsmindfulness.be/team/sandrine-rauter"
              className="text-white underline hover:text-sky-600"
              rel="noreferrer"
            >
              Brussels mindfulness
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
