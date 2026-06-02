import {useEffect, useState} from "react";
import {useGame} from "../contexts/GameContext.tsx";

interface Confetti {
    id: number;
    src: string;
    left: string;
    delay: string;
    duration: string;
}

export default function FlagConfetti() {

    const {selectedCountry} = useGame();
    const [confetti, setConfetti] = useState<Confetti[] >([])
    const pieceCount = 500;


    useEffect(() => {
        const setAllConfetti = () => {
            if (!selectedCountry) return

            const pieces: Confetti[] = Array.from({ length: pieceCount }).map((_, i) => {
                return {
                    id: i,
                    src: selectedCountry.flags.png,
                    // Position horizontale aléatoire (de 0% à 100% de l'écran)
                    left: `${Math.random() * 100}vw`,
                    // Délai d'animation aléatoire pour qu'ils ne tombent pas tous en même temps
                    delay: `${Math.random() * 4}s`,
                    // Durée de chute aléatoire (entre 3s et 6s)
                    duration: `${3 + Math.random() * 5}s`,
                };

            });
            setConfetti(pieces);
        }
        setAllConfetti()
    }, []);

    return (
        <div
            className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
            aria-hidden="true"
        >
            {confetti.map((piece) => (
                <img
                    src={piece.src}
                    alt=""
                    className="absolute top-[-4%] w-8 h-auto animate-flag-fall shadow-sm"
                    style={{
                        left: piece.left,
                        animationDelay: piece.delay,
                        animationDuration: piece.duration,
                    }}
                />
            ))}
        </div>
    );
}