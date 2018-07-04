#include <razter/razter.h>

int main() {
    GLFWwindow* window = glfwCreateWindow(800, 600, "Razter Test", NULL, NULL);
    
    while(!glfwWindowShouldClose(window)) {
        glfwPollEvents();
    }
}
