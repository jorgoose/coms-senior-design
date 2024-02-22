package utils

import (
	"github.com/magiconair/properties"
)

var (
	SUPABASE_KEY = "SUPABASE_KEY"
	SUPABASE_URL = "SUPABASE_URL"
)

var PropertyFile = []string{"./env.properties"}

var Props, _ = properties.LoadFiles(PropertyFile, properties.UTF8, true)

type ResourceManager struct {
}

func (res ResourceManager) GetProperty(propertyName string) string {
	message := ""
	var ok bool
	message, ok = Props.Get(propertyName)
	if !ok {
		return Props.MustGet("Property not found")
	} else {
		return message
	}
}
