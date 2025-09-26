import pyautogui
import time
import random

def move_mouse_up_down():
    # Get the screen width and height
    screen_width, screen_height = pyautogui.size()


    # Randomize the movement interval between 1 and 5 seconds
    interval = random.randint(1, 5)
    print(f"Moving mouse at {interval} seconds interval")
    
    # Move the mouse up and down a little
    while True:
        # Perform a more noticeable random up/down movement
        for _ in range(5):  # Simulate 5 up/down movements
            y_move = random.randint(-120, 120)  # Larger random y-movement
            pyautogui.move(0, y_move)
            time.sleep(random.uniform(0.5, 1.5))  # Random pauses between moves

        # Move mouse more noticeably to simulate wandering behavior
        for _ in range(random.randint(10, 20)):  # Random amount of movement
            x_move = random.randint(-50, 50)  # Larger random x-movement
            y_move = random.randint(-30, 30)  # Larger random y-movement
            pyautogui.move(x_move, y_move)
            time.sleep(random.uniform(0.2, 0.5))  # Random pauses

        # Occasionally simulate a click to ensure activity detection
        if random.random() < 0.1:  # 10% chance of click
            pyautogui.click()
            print("Simulating mouse click.")

        # Sleep for the interval time (1 to 5 seconds)
        print(f"Sleeping for {interval} seconds before next up/down motion.")
        time.sleep(interval)

def main():
    while True:
        # Wait for 5 minutes before moving the mouse to the right
        time.sleep(5)

        # Move mouse and perform up/down motions
        move_mouse_up_down()


if __name__ == "__main__":
    main()
