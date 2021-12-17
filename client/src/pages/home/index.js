// Redux
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSocket } from '../../store/reducers/socket';

// Models
import AlertModel from '../../components/alert-model'
import WinAlert from '../../components/win-alert'

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export default function Home() {
  const socket = useSelector(getSocket);

  const [reset, setReset] = useState(false);

  const [moves, setMoves] = useState([])

  const [placingBlock, setPlacingBlock] = useState(false);

  const [Turn, setTurn] = useState('player');

  const [Plays, setPlays] = useState([[]]);

  const [Winner, setWinner] = useState("");
  const [hasWon, setHasWon] = useState(false);

  socket.onopen = () => {
    socket.send("conn")
  }

  useEffect(() => {
    checkWin()
  }, [moves])

  socket.onmessage = (data) => {
    switch (data.data) {
      // Reset board
      case 'reset':
        setReset(true)
        setPlays([]);
        setMoves([]);

        setHasWon(false);
        setWinner("");
        break
      case 'reset_done':
        setReset(false);
        break;
      case 'pb':
        console.log('placing Block')
        setPlacingBlock(true);
        break;
      case 'dp':
        console.log('Done placing')
        setPlacingBlock(false);
        break;
    }

    if ((data.data).substring(0, 2) === 'p=') {
      let positions = (data.data).substring(2)

      let tempMoves = [];

      let length = positions.length;

      let actData =  []

      for (let i = 0; i < length / 2; i++) {
        let temp = positions.substring(0, 2);

        tempMoves[Number(temp[0]) - 1] = temp[1]

        actData.push([Number(temp[0]), temp[1]])

        positions = positions.substring(2);
      }

      setMoves(tempMoves);
      setPlays(setPlays => actData)
    }
  }

  const checkWin = () => {
    let roundWon = false;
    let winner = "";

    winningConditions.forEach((winCondition, i) => {
      let a = moves[winCondition[0]];
      let b = moves[winCondition[1]];
      let c = moves[winCondition[2]];

      console.log(moves)

      if (a != undefined && b != undefined && c != undefined) {
        if (a == b && b == c) {
          console.log(`Winner ${a}`)
          if (a == 'o') {
            setWinner("Orange")
          } else if (a == 'g') {
            setWinner("Grey")
          }

          setHasWon(true);
        }
      }
    });
  };

  // Order of grid
  const btns = [1, 4, 7, 2, 5, 8, 3, 6, 9]

  const onClick = (e, num) => {
    if (!placingBlock) {
      setPlacingBlock(true)
      socket.send(num);
    }
  }

  return (
    <div className="flex justify-center items-center flex-col">
         <AlertModel open={reset} />
         <WinAlert open={hasWon} winner={Winner} />
      <h2 className="mb-5 text-center">
        <b className="mb-4 block">TicTacToe</b>
        <div
          className={`
            ${!placingBlock ? Plays.length == 9 ? 'bg-yellow-600 text-green-800' : 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
            flex items-center justify-center text-center px-2.5 py-0.5 rounded-full text-sm font-medium
          `}
        >
          <p className={`text-center text-${placingBlock ? 'yellow-900' : Plays.length == 9 ? 'white' : 'green-900'}`}>{placingBlock ?  'Please wait, placing a block' : Plays.length == 9 ? 'Waiting for reset' : 'Ready'}</p>
        </div>
      </h2>
      <div className="bg-white overflow-hidden shadow rounded-lg block">
        <div className="px-4 py-5">
          <div className="grid grid-rows-3 grid-flow-col gap-4">
           {
           btns.map((btn, i) =>
            <button
              key={i}
              className={`w-20 h-20 rounded-lg
              ${typeof Plays.find((arr) => arr.includes(btn)) === "object" ?
                `bg-${Plays.find((arr) => arr.includes(btn))[1] === "o" ? `green` : `blue` }-200 cursor-not-allowed`
              : 'bg-gray-300'}`}
              disabled={placingBlock == true || (Plays.find((arr) => arr.includes(btn))) ? true : false}
              onClick={(e) => onClick(e, btn)}
            />
           )}
          </div>
        </div>
      </div>
    </div>
  )
}
