package home

import (
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/AdguardTeam/AdGuardHome/internal/aghhttp"
	"github.com/AdguardTeam/golibs/log"
	"github.com/AdguardTeam/golibs/stringutil"
)

// TODO(a.garipov): Get rid of a global or generate from .twosky.json.
var allowedLanguages = stringutil.NewSet(
	"en",
)

func handleI18nCurrentLanguage(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain")
	log.Printf("config.Language is %s", config.Language)
	_, err := fmt.Fprintf(w, "%s\n", config.Language)
	if err != nil {
		msg := fmt.Sprintf("Unable to write response json: %s", err)
		log.Println(msg)
		http.Error(w, msg, http.StatusInternalServerError)
		return
	}
}

func handleI18nChangeLanguage(w http.ResponseWriter, r *http.Request) {
	// This use of ReadAll is safe, because request's body is now limited.
	body, err := io.ReadAll(r.Body)
	if err != nil {
		msg := fmt.Sprintf("failed to read request body: %s", err)
		log.Println(msg)
		http.Error(w, msg, http.StatusBadRequest)
		return
	}

	language := strings.TrimSpace(string(body))
	if language == "" {
		msg := "empty language specified"
		log.Println(msg)
		http.Error(w, msg, http.StatusBadRequest)

		return
	}

	if !allowedLanguages.Has(language) {
		msg := fmt.Sprintf("unknown language specified: %s", language)
		log.Println(msg)
		http.Error(w, msg, http.StatusBadRequest)

		return
	}

	func() {
		config.Lock()
		defer config.Unlock()

		config.Language = language
	}()

	onConfigModified()
	aghhttp.OK(w)
}
