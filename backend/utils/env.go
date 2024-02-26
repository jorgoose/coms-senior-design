package utils

import (
	"os"
)

type ResourceManager struct {
}

func (res ResourceManager) GetProperty(propertyName string) string {
	value := os.Getenv(propertyName)
	if value == "" {
		return "Property not found"
	}
	return value
}
