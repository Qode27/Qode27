$repoUrl = 'https://github.com/Kansalt-com/Sims_Hospital.git'
$target = 'external/sims-hospital'

if (-not (Test-Path 'external')) {
  New-Item -ItemType Directory -Path 'external' | Out-Null
}

if (-not (Test-Path $target)) {
  git clone --depth 1 $repoUrl $target
} else {
  git -C $target fetch --depth 1 origin main
  git -C $target checkout main
  git -C $target pull --ff-only origin main
}

Write-Host "Sims Hospital repo attached at $target"
