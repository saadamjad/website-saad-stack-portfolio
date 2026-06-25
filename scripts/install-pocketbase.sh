#!/usr/bin/env bash
# Download PocketBase binary matching .pocketbase-version for this OS/arch.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PB_DIR="$ROOT/apps/pocketbase"
VERSION_FILE="$PB_DIR/.pocketbase-version"
TARGET="$PB_DIR/pocketbase"

if [[ ! -f "$VERSION_FILE" ]]; then
  echo "ERROR: missing $VERSION_FILE" >&2
  exit 1
fi

VERSION="$(tr -d '[:space:]' < "$VERSION_FILE")"
OS="$(uname -s | tr '[:upper:]' '[:lower:]')"
ARCH="$(uname -m)"

case "$OS-$ARCH" in
  darwin-arm64)  PLATFORM="darwin_arm64" ;;
  darwin-x86_64) PLATFORM="darwin_amd64" ;;
  linux-x86_64)  PLATFORM="linux_amd64" ;;
  linux-aarch64) PLATFORM="linux_arm64" ;;
  *)
    echo "ERROR: unsupported platform $OS $ARCH" >&2
    exit 1
    ;;
esac

if [[ -x "$TARGET" ]]; then
  if file "$TARGET" | grep -q "executable"; then
    # Skip re-download if binary matches host arch (darwin arm64 vs linux amd64, etc.)
    case "$PLATFORM" in
      darwin_arm64)  file "$TARGET" | grep -q "arm64" && exit 0 ;;
      darwin_amd64)  file "$TARGET" | grep -q "x86_64" && exit 0 ;;
      linux_amd64)   file "$TARGET" | grep -q "x86-64" && exit 0 ;;
      linux_arm64)   file "$TARGET" | grep -q "aarch64" && exit 0 ;;
    esac
  fi
fi

URL="https://github.com/pocketbase/pocketbase/releases/download/v${VERSION}/pocketbase_${VERSION}_${PLATFORM}.zip"
TMP="$(mktemp -d)"

echo "→ Downloading PocketBase v${VERSION} (${PLATFORM})..."
curl -fsSL "$URL" -o "$TMP/pocketbase.zip"
unzip -q "$TMP/pocketbase.zip" pocketbase -d "$TMP"
mv "$TMP/pocketbase" "$TARGET"
chmod +x "$TARGET"
rm -rf "$TMP"

echo "✓ Installed $TARGET ($(file "$TARGET" | cut -d: -f2))"
