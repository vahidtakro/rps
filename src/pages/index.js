import Image from 'next/image'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import {useEffect, useState} from 'react'
import css from '../styles/Main.module.css';
import {LocalStorage} from '../components/localstorage'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

const random = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
export default function Home() {
  const ICONS = {
    SCISSORS: 1,
    PAPER: 2,
    ROCK: 3
  }
  const [activeIconId, setActiveIconId] = useState(1);
  const [systemIconId, setSystemIconId] = useState(0);
  const [result, setResult] = useState('');

  useEffect(() => {
      let result = '';
      if (!systemIconId) {
          return;
      }
      if (systemIconId === activeIconId) {
          result = 'You are equal';
          LocalStorage.add(EQUAL);
      } else {
          if (
              activeIconId === ICONS.SCISSORS && (systemIconId === ICONS.PAPER) ||
              activeIconId === ICONS.PAPER && (systemIconId === ICONS.ROCK) ||
              activeIconId === ICONS.ROCK && (systemIconId === ICONS.SCISSORS)
          ) {
              result = WINNER_TEXT;
              LocalStorage.add(WIN);
          } else {
              result = LOSER_TEXT;
              LocalStorage.add(LOSE);
          }
          switch (activeIconId) {
              case ICONS.SCISSORS:
                  result = (systemIconId === ICONS.PAPER) ? WINNER_TEXT : LOSER_TEXT;
                  break;
              case ICONS.PAPER:
                  result = (systemIconId === ICONS.ROCK) ? WINNER_TEXT : LOSER_TEXT;
                  break;
              case ICONS.ROCK:
                  result = (systemIconId === ICONS.SCISSORS) ? WINNER_TEXT : LOSER_TEXT;
                  break;
          }
      }

      if (result) {
          setResult(result);
      }
  }, [systemIconId]);

  useEffect(() => setResult(''), [activeIconId]);

  const RightClick = () => {
      if (activeIconId === ICONS.ROCK) {
          setActiveIconId(ICONS.SCISSORS);
      } else {
          setActiveIconId(prevState => prevState + 1);
      }
  };
  const LeftClick = () => {
      if (activeIconId === ICONS.SCISSORS) {
          setActiveIconId(ICONS.ROCK);
      } else {
          setActiveIconId(prevState => prevState - 1);
      }
  };

  const letsPlay = () => {
      setSystemIconId(randomIcon());
  }


  const randomIcon = () => {
      return random(1, 3);
  }

  const IconBox = (props) => {
    const selected = props.selected || -1;
    if (selected === -1) return (<>?</>);
    return (
        <>

            <p className={css.icon + ' ' + (selected === 1 ? css.active : '')}>
              ✂️
            </p>
            <p className={css.icon + ' ' + (selected === 2 ? css.active : '')}>
              📄
            </p>
            <p className={css.icon + ' ' + (selected === 3 ? css.active : '')}>
              🪨
            </p>
        </>
    );
  }

  const LOSE = 'lose';
  const WIN = 'win';
  const EQUAL = 'equal';
  const WINNER_TEXT = 'You win!';
  const LOSER_TEXT = 'You are loser!';
  
  return (
    <div>
      <Head>
        <title>RSP Test</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Let&apos;s play&nbsp;
          <code className="font-mono font-bold">Rock, Paper and Scissors</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
      {
        result ?
        <div>
            {result}
        </div>
        : ''
      }
      </div>

      

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left space-x-4">
        <div
          className="rounded-lg border border-transparent px-5 py-4 transition-colors dark:border-neutral-700 dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Select
          </h2>
          <div className="flex flex-wrap">
              <div className="bg-gray-500 leading-none text-white p-4 rounded-[50%] hover:brightness-50" onClick={LeftClick}>
                👈
              </div>
              <div className="text-[10rem]">
                  <IconBox selected={activeIconId} owner='player'/>
              </div>
              <div className="bg-gray-500 leading-none text-white p-4 rounded-[50%] hover:brightness-50" onClick={RightClick}>
                👉
              </div>

          </div>
        </div>


        <div
          className="rounded-lg border border-transparent px-5 py-4 transition-colors dark:border-neutral-700 dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            System
          </h2>
          <div className="flex flex-wrap">
              <div className="text-[10rem]">
              <IconBox selected={systemIconId} owner='opponent'/>
              </div>
          </div>
        </div>
      </div>
      <button onClick={letsPlay} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Play
      </button>
      <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="/results">Results</Link>
    </main>
    </div>
  )
}
