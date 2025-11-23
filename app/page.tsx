'use client'

import { useState, useEffect, useRef } from 'react'

interface Exercise {
  name: string
  duration: number
  reps: string
  description: string
  restAfter: number
}

const workout: Exercise[] = [
  {
    name: "Goblet Squats",
    duration: 45,
    reps: "12-15 reps",
    description: "Hold one dumbbell vertically at chest. Squat deep, keeping chest up.",
    restAfter: 15
  },
  {
    name: "Dumbbell Push Press",
    duration: 45,
    reps: "10-12 reps",
    description: "Both dumbbells at shoulders. Use slight leg drive to press overhead.",
    restAfter: 15
  },
  {
    name: "Bent-Over Rows",
    duration: 45,
    reps: "12-15 reps each arm",
    description: "Hinge forward, row dumbbell to hip. Alternate arms or do one side at a time.",
    restAfter: 15
  },
  {
    name: "Dumbbell Romanian Deadlifts",
    duration: 45,
    reps: "12-15 reps",
    description: "Hold dumbbells in front. Hinge at hips, lower with straight legs, feel hamstring stretch.",
    restAfter: 15
  },
  {
    name: "Arnold Press",
    duration: 45,
    reps: "10-12 reps",
    description: "Start palms facing you at shoulders. Rotate palms out while pressing overhead.",
    restAfter: 15
  },
  {
    name: "Dumbbell Lunges",
    duration: 45,
    reps: "10 reps each leg",
    description: "Hold dumbbells at sides. Step forward into lunge, alternate legs.",
    restAfter: 15
  },
  {
    name: "Renegade Rows",
    duration: 45,
    reps: "8-10 reps each arm",
    description: "Plank position on dumbbells. Row one dumbbell up while stabilizing.",
    restAfter: 15
  },
  {
    name: "Dumbbell Bicep Curls",
    duration: 40,
    reps: "12-15 reps",
    description: "Stand with dumbbells at sides. Curl both up, control down.",
    restAfter: 15
  },
  {
    name: "Overhead Tricep Extension",
    duration: 40,
    reps: "12-15 reps",
    description: "One dumbbell overhead with both hands. Lower behind head, extend up.",
    restAfter: 15
  },
  {
    name: "Dumbbell High Pulls",
    duration: 45,
    reps: "12-15 reps",
    description: "Explosive pull from hips to chest height, elbows high. Total body power move.",
    restAfter: 0
  }
]

export default function Home() {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(workout[0].duration)
  const [isRunning, setIsRunning] = useState(false)
  const [isResting, setIsResting] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [completedExercises, setCompletedExercises] = useState<boolean[]>(new Array(workout.length).fill(false))
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLaiTcIGWi77+edTRAMUqfj8LZjHAU7k9n1zm8lBSp7y/LZjjkHHGy98d+VRQoTYbno7KdWEwxKouH0vWshBSuCzvLaiTcIG2m98OadTRAMUqfj8LZjHAU7k9n1zm8lBSt7y/LZjjkHHGy98d+VRQoTYbno7KdWEwxKouH0vWshBSuCzvLaiTcIG2m98OadTRANU6fk77ZkGwU8lNr1z3ElBSx8y/PajDkHHGy98d+VRQoTYbno7KdWEwxKouH0vWshBSuCzvLaiTcIG2m98OadTRANU6fk77ZkGwU8lNr1z3ElBSx8y/PajDkHHGy98d+VRQoTYbno7KdWEwxKouH0vWshBSuCzvLaiTcIG2m98OadTRANU6fk77ZkGwU8lNr1z3ElBSx8y/PajDkHHGy98d+VRQoTYbno7KdWEwxKouH0vWshBSuCzvLaiTcIG2m98OadTRANU6fk77ZkGwU8lNr1z3ElBSx8y/PajDkHHGy98d+VRQoTYbno7KdWEwxKouH0vWshBSuCzvLaiTcIG2m98OadTRANU6fk77ZkGwU8lNr1z3ElBSx8y/PajDkHHGy98d+VRQoTYbno7KdWEwxKouH0vWshBSuCzvLaiTcIG2m98OadTRANU6fk77ZkGwU8lNr1z3ElBSx8y/PajDkHHGy98d+VRQoTYbno7KdWEwxKouH0vWsh')
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            playBeep()
            if (isResting) {
              // Rest is over, move to next exercise
              const nextIndex = currentExerciseIndex + 1
              if (nextIndex < workout.length) {
                setCurrentExerciseIndex(nextIndex)
                setTimeRemaining(workout[nextIndex].duration)
                setIsResting(false)
              } else {
                // Workout complete
                setIsRunning(false)
                setCompleted(true)
              }
            } else {
              // Exercise is over, start rest
              const newCompleted = [...completedExercises]
              newCompleted[currentExerciseIndex] = true
              setCompletedExercises(newCompleted)

              if (workout[currentExerciseIndex].restAfter > 0) {
                setTimeRemaining(workout[currentExerciseIndex].restAfter)
                setIsResting(true)
              } else {
                // No rest, workout complete
                setIsRunning(false)
                setCompleted(true)
              }
            }
            return 0
          }
          return time - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeRemaining, isResting, currentExerciseIndex, completedExercises])

  const playBeep = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }
  }

  const startWorkout = () => {
    setIsRunning(true)
  }

  const pauseWorkout = () => {
    setIsRunning(false)
  }

  const resetWorkout = () => {
    setCurrentExerciseIndex(0)
    setTimeRemaining(workout[0].duration)
    setIsRunning(false)
    setIsResting(false)
    setCompleted(false)
    setCompletedExercises(new Array(workout.length).fill(false))
  }

  const skipExercise = () => {
    const nextIndex = currentExerciseIndex + 1
    if (nextIndex < workout.length) {
      setCurrentExerciseIndex(nextIndex)
      setTimeRemaining(workout[nextIndex].duration)
      setIsResting(false)
      const newCompleted = [...completedExercises]
      newCompleted[currentExerciseIndex] = true
      setCompletedExercises(newCompleted)
    } else {
      setIsRunning(false)
      setCompleted(true)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const totalTime = workout.reduce((acc, ex) => acc + ex.duration + ex.restAfter, 0)
  const elapsedTime = workout.slice(0, currentExerciseIndex).reduce((acc, ex) => acc + ex.duration + ex.restAfter, 0) +
                      (isResting ? workout[currentExerciseIndex].duration : workout[currentExerciseIndex].duration - timeRemaining)
  const progress = (elapsedTime / totalTime) * 100

  if (completed) {
    return (
      <div className="container">
        <div className="workout-card">
          <div className="completion-message">
            <h2>🎉 Workout Complete! 🎉</h2>
            <p>Great job! You&apos;ve completed your 15-minute full body workout.</p>
            <p>Your muscles are growing stronger with every session!</p>
            <button onClick={resetWorkout} className="btn btn-primary">
              Start New Workout
            </button>
          </div>
          <div className="info-section" style={{marginTop: '30px'}}>
            <h3>💪 What You&apos;ve Accomplished:</h3>
            <ul>
              <li>Full body strength training targeting all major muscle groups</li>
              <li>Legs: Squats, Lunges, Romanian Deadlifts</li>
              <li>Upper Body Push: Push Press, Arnold Press, Triceps</li>
              <li>Upper Body Pull: Rows, High Pulls, Biceps</li>
              <li>Core: Stabilization through all exercises + Renegade Rows</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="header">
        <h1>💪 15-Min Dumbbell Workout</h1>
        <p>Full Body • Strength & Growth • 5kg Dumbbells</p>
      </div>

      <div className="workout-card">
        <div className="timer-section">
          {isResting ? (
            <>
              <div className="status-badge status-rest">REST</div>
              <div className="exercise-name">Take a breather</div>
            </>
          ) : (
            <>
              <div className="status-badge status-work">WORK</div>
              <div className="exercise-name">{workout[currentExerciseIndex].name}</div>
              <div className="exercise-reps">{workout[currentExerciseIndex].reps}</div>
            </>
          )}
          <div className="timer">{formatTime(timeRemaining)}</div>

          {!isResting && (
            <p style={{fontSize: '1rem', opacity: 0.9, marginTop: '-10px'}}>
              {workout[currentExerciseIndex].description}
            </p>
          )}
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{width: `${progress}%`}}></div>
        </div>

        <div className="controls">
          {!isRunning ? (
            <button onClick={startWorkout} className="btn btn-primary">
              {currentExerciseIndex === 0 && !isResting ? 'Start Workout' : 'Resume'}
            </button>
          ) : (
            <button onClick={pauseWorkout} className="btn btn-secondary">
              Pause
            </button>
          )}
          <button onClick={skipExercise} className="btn btn-secondary" disabled={!isRunning}>
            Skip
          </button>
          <button onClick={resetWorkout} className="btn btn-danger">
            Reset
          </button>
        </div>

        <div className="exercise-list">
          <h3 style={{marginBottom: '20px', color: '#667eea'}}>Workout Plan</h3>
          {workout.map((exercise, index) => (
            <div
              key={index}
              className={`exercise-item ${index === currentExerciseIndex ? 'active' : ''} ${completedExercises[index] ? 'completed' : ''}`}
            >
              <h3>
                {completedExercises[index] ? '✓ ' : ''}{exercise.name}
              </h3>
              <p>{exercise.reps}</p>
              <p className="time">{exercise.duration}s work • {exercise.restAfter}s rest</p>
            </div>
          ))}
        </div>

        <div className="info-section">
          <h3>📋 Workout Notes</h3>
          <ul>
            <li><strong>Total Time:</strong> ~15 minutes including rest periods</li>
            <li><strong>Focus:</strong> Compound movements for maximum muscle recruitment</li>
            <li><strong>Progression:</strong> Increase reps or add a second round when too easy</li>
            <li><strong>Form over Speed:</strong> Control each rep, feel the muscle working</li>
            <li><strong>Frequency:</strong> 3-5x per week for best results (even 2x helps!)</li>
            <li><strong>Muscle Growth:</strong> Progressive overload + consistency = results</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
