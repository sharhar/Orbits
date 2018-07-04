cmake_minimum_required(VERSION 2.8.11)

file(GLOB_RECURSE ORBITS_H *.h)
file(GLOB_RECURSE ORBITS_C *.c)

if(APPLE)

	add_executable(
		orbits 
		MACOSX_BUNDLE
		${ORBITS_H}
		${ORBITS_C}
		#"${CMAKE_CURRENT_SOURCE_DIR}/res"
	)

	#SET_SOURCE_FILES_PROPERTIES(
	#	"${CMAKE_CURRENT_SOURCE_DIR}/res"
	#	PROPERTIES
	#	MACOSX_PACKAGE_LOCATION Resources
	#	)

elseif(MSVC)
	add_executable(orbits ${ORBITS_H} ${ORBITS_C})
	file(COPY "${CMAKE_CURRENT_SOURCE_DIR}/res" DESTINATION "${CMAKE_RUNTIME_OUTPUT_DIRECTORY}/Debug")
	file(COPY "${CMAKE_CURRENT_SOURCE_DIR}/res" DESTINATION "${CMAKE_RUNTIME_OUTPUT_DIRECTORY}/Release")
	file(COPY "${CMAKE_CURRENT_SOURCE_DIR}/res" DESTINATION "${CMAKE_BINARY_DIR}/src/razter-Test")
else()
	add_executable(orbits ${ORBITS_H} ${ORBITS_C})
	file(COPY "${CMAKE_CURRENT_SOURCE_DIR}/res" DESTINATION "${CMAKE_RUNTIME_OUTPUT_DIRECTORY}")
endif()

#target_include_directories (orbits PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/../../include)

if(APPLE)
	find_path(QUARTZCORE_INCLUDE_DIR QuartzCore/QuartzCore.h)
	find_library(QUARTZCORE_LIBRARY QuartzCore)

	find_path(METAL_INCLUDE_DIR Metal/Metal.h)
	find_library(METAL_LIBRARY Metal)

	target_link_libraries (orbits ${QUARTZCORE_LIBRARY})
	target_link_libraries (orbits ${METAL_LIBRARY})
endif()

target_link_libraries (orbits LINK_PUBLIC VKL)
target_link_libraries (orbits LINK_PUBLIC razter)
target_link_libraries (orbits glfw ${GLFW_LIBRARIES})
