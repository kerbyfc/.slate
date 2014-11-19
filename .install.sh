[[ ! -d "~/.slate" ]] && git clone --recursive https://github.com/kerbyfc/.slate.git "$HOME/.slate"

ln -s ~/.slate/slate.js ~/.slate.js
ln -s ~/.slate/slate.json.sample ~/.slate.json
