import { clsx } from 'clsx';
import Image from 'next/image';
import type { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import IconLotus from '@/public/icons/lotus.svg';
import IconMeditation from '@/public/icons/meditation.svg';
import IconYoga from '@/public/icons/yoga.svg';

export const AboutMeCard: FC<{ className?: string }> = (props) => {
  const { className = '' } = props;
  return (
    <div
      className={twMerge(
        clsx(
          'font-custom-style-body relative flex min-h-screen flex-col justify-center overflow-hidden border-8 border-blue-400 bg-gray-50 py-6 text-white sm:py-12'
        ),
        className
      )}
    >
      <Image
        src="/logo.com/sandrine-rauter-white.png"
        alt=""
        className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        fill={true}
      />
      <div className="bg-custom-brown relative px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
        <div className="mx-auto max-w-md">
          <div className="bg-white">
            <Image
              src="/images/sandrine-photo-1.jpg"
              className=""
              width={800}
              height={800}
              alt={'Photo profil Sandrine'}
            />
          </div>
          <div className={'pt-5 text-2xl font-extralight uppercase leading-8'}>
            Pleine conscience et yoga. Teintée de nature et sa profondeur.
            Loving soul.
          </div>

          <div className="divide-y divide-gray-300/50">
            <div className="space-y-6 py-8 text-base font-normal leading-7 text-neutral-800">
              <p className={'text-3xl font-light text-white'}>
                Bonjour, à mon propos
              </p>
              <p>
                Je suis Sandrine Rauter, professeur de Yoga et de pleine
                conscience / mindfuless depuis de nombreuses années. Pour celles
                et ceux dont je n'ai pas encore eu le plaisir de faire
                connaissance, vous trouverez un aperçu de mon parcours ici.
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
                  <p className="ml-4">
                    Classes de yoga en présentiel ou en ligne
                  </p>
                </li>
                <li className="flex items-center">
                  <IconMeditation className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" />
                  <p className="ml-4">
                    Stages et retraites de yoga et méditation.
                  </p>
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
      </div>
    </div>
  );
};
