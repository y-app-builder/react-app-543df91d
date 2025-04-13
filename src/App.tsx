import React, { useState, useEffect, useCallback } from 'react';

function App() {
  const [frog, setFrog] = useState({ x: 0, y: 0 });
  const [obstacles, setObstacles] = useState<{ x: number; y: number }[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!gameOver) {
        switch (event.key) {
          case 'ArrowUp':
            setFrog((prev) => ({ ...prev, y: prev.y - 1 }));
            break;
          case 'ArrowDown':
            setFrog((prev) => ({ ...prev, y: prev.y + 1 }));
            break;
          case 'ArrowLeft':
            setFrog((prev) => ({ ...prev, x: prev.x - 1 }));
            break;
          case 'ArrowRight':
            setFrog((prev) => ({ ...prev, x: prev.x + 1 }));
            break;
        }
      }
    },
    [gameOver]
  );

  useEffect(() => {
    const handleObstacles = setInterval(() => {
      setObstacles((prev) =>
        prev.concat([{ x: Math.floor(Math.random() * 10), y: -1 }])
      );
    }, 1000);

    return () => clearInterval(handleObstacles);
  }, []);

  useEffect(() => {
    const handleCollision = () => {
      const collision = obstacles.some(
        (obstacle) => obstacle.x === frog.x && obstacle.y === frog.y
      );
      if (collision) {
        setGameOver(true);
      } else if (frog.y === 10) {
        setScore((prev) => prev + 1);
        setFrog({ x: 0, y: 0 });
      }
    };

    handleCollision();
  }, [frog, obstacles]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'sans-serif',
      }}
    >
      <h1>Frogger</h1>
      <p>Score: {score}</p>
      {gameOver && <p>Game Over</p>}
      <div
        style={{
          width: '200px',
          height: '200px',
          border: '1px solid black',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: 'green',
            position: 'absolute',
            left: frog.x * 20,
            top: frog.y * 20,
          }}
        />
        {obstacles.map((obstacle, index) => (
          <div
            key={index}
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: 'red',
              position: 'absolute',
              left: obstacle.x * 20,
              top: obstacle.y * 20,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;