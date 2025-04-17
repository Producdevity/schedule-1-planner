/* eslint-disable @typescript-eslint/no-require-imports */

const https = require('https')
const fs = require('fs')
const path = require('path')

const imgs = [
  'https://static.wikia.nocookie.net/schedule-1/images/7/7e/Grow_Tent_Icon.png/revision/latest?cb=20250406210836',
  'https://static.wikia.nocookie.net/schedule-1/images/3/36/Soil_Icon.png/revision/latest?cb=20250406205203',
  'https://static.wikia.nocookie.net/schedule-1/images/e/ea/LongLifeSoil_Icon.png/revision/latest?cb=20250406205418',
  'https://static.wikia.nocookie.net/schedule-1/images/6/6d/ExtraLongLifeSoil_Stored_Icon.png/revision/latest?cb=20250406205617',
  'https://static.wikia.nocookie.net/schedule-1/images/c/cd/WateringCan_Icon.png/revision/latest?cb=20250406210120',
  'https://static.wikia.nocookie.net/schedule-1/images/1/17/Trimmers_Icon.png/revision/latest?cb=20250406210143',
  'https://static.wikia.nocookie.net/schedule-1/images/0/06/Electric_Trimmers_Icon.png/revision/latest?cb=20250406210227',
  'https://static.wikia.nocookie.net/schedule-1/images/6/67/PackagingStation_Icon.png/revision/latest?cb=20250406210606',
  'https://static.wikia.nocookie.net/schedule-1/images/9/9f/Packaging_Station_Mk2_Icon.png/revision/latest?cb=20250406210723',
  'https://static.wikia.nocookie.net/schedule-1/images/7/72/Baggie_Icon.png/revision/latest?cb=20250406205932',
  'https://static.wikia.nocookie.net/schedule-1/images/7/74/Single_Bed_Icon.png/revision/latest?cb=20250406211254',
  'https://static.wikia.nocookie.net/schedule-1/images/1/1b/Coffee_Table_Icon.png/revision/latest?cb=20250406210921',
  'https://static.wikia.nocookie.net/schedule-1/images/5/53/Wood_Square_Table_Icon.png/revision/latest?cb=20250406210946',
  'https://static.wikia.nocookie.net/schedule-1/images/0/0c/Metal_Square_Table_Icon.png/revision/latest?cb=20250406211021',
  'https://static.wikia.nocookie.net/schedule-1/images/7/7d/TV_Icon.png/revision/latest?cb=20250406211043',
  'https://static.wikia.nocookie.net/schedule-1/images/b/bb/StorageRack_Small_Icon.png/revision/latest?cb=20250406210358',
  'https://static.wikia.nocookie.net/schedule-1/images/d/df/StorageRack_Medium_Icon.png/revision/latest?cb=20250406210437',
  'https://static.wikia.nocookie.net/schedule-1/images/4/47/StorageRack_Large_Icon.png/revision/latest?cb=20250406210458',
  'https://static.wikia.nocookie.net/schedule-1/images/3/3d/Display_Cabinet_Icon.png/revision/latest?cb=20250406210527',
  'https://static.wikia.nocookie.net/schedule-1/images/b/bc/TrashBag_Icon.png/revision/latest?cb=20250406210327',
  'https://static.wikia.nocookie.net/schedule-1/images/0/00/TrashGrabber_Icon.png/revision/latest?cb=20250406210257',
  'https://static.wikia.nocookie.net/schedule-1/images/9/9e/Bin_Icon.png/revision/latest?cb=20250406210048',
  'https://static.wikia.nocookie.net/schedule-1/images/f/fa/Jar_Icon.png/revision/latest?cb=20250406205956',
  'https://static.wikia.nocookie.net/schedule-1/images/a/a5/Fertilizer_Icon.png/revision/latest?cb=20250406205707',
  'https://static.wikia.nocookie.net/schedule-1/images/1/18/PGR_Icon.png/revision/latest?cb=20250406205737',
  'https://static.wikia.nocookie.net/schedule-1/images/d/d4/SpeedGrow_Icon.png/revision/latest?cb=20250406205827',
  'https://static.wikia.nocookie.net/schedule-1/images/6/60/Sprinkler_Icon.png/revision/latest?cb=20250406211153',
  'https://static.wikia.nocookie.net/schedule-1/images/7/7b/Mixing_Station_Icon.png/revision/latest?cb=20250406210649',
  'https://static.wikia.nocookie.net/schedule-1/images/5/58/Soil_Pourer_Icon.png/revision/latest?cb=20250406211214',
  'https://static.wikia.nocookie.net/schedule-1/images/d/dc/OGKushSeed_Icon.png/revision/latest?cb=20250406204858',
  'https://static.wikia.nocookie.net/schedule-1/images/9/96/SourDieselSeed_Icon.png/revision/latest?cb=20250406204957',
  'https://static.wikia.nocookie.net/schedule-1/images/e/e1/GreenCrackSeed_Icon.png/revision/latest?cb=20250406205019',
  'https://static.wikia.nocookie.net/schedule-1/images/f/fb/GranddaddyPurpleSeed_Icon.png/revision/latest?cb=20250406205039',
  'https://static.wikia.nocookie.net/schedule-1/images/9/95/Pseudo_Icon.png/revision/latest?cb=20250406211738',
  'https://static.wikia.nocookie.net/schedule-1/images/1/10/CocaSeed_Icon.png/revision/latest?cb=20250410194224',
  'https://static.wikia.nocookie.net/schedule-1/images/9/98/Cheap_Skateboard_Icon.png/revision/latest?cb=20250406211846',
  'https://static.wikia.nocookie.net/schedule-1/images/6/6f/Skateboard_Icon.png/revision/latest?cb=20250406211922',
  'https://static.wikia.nocookie.net/schedule-1/images/3/3c/Lightweight_Skateboard_Icon.png/revision/latest?cb=20250406211941',
  'https://static.wikia.nocookie.net/schedule-1/images/e/ed/Cruiser_Icon.png/revision/latest?cb=20250406211959',
  'https://static.wikia.nocookie.net/schedule-1/images/f/f0/Gold_Skateboard_Icon.png/revision/latest?cb=20250406212019',
  'https://static.wikia.nocookie.net/schedule-1/images/a/ae/Cuke_Icon.png/revision/latest?cb=20250406212111',
  'https://static.wikia.nocookie.net/schedule-1/images/3/31/Banana_Icon.png/revision/latest?cb=20250406212129',
  'https://static.wikia.nocookie.net/schedule-1/images/2/23/Paracetamol_Icon.png/revision/latest?cb=20250406212147',
  'https://static.wikia.nocookie.net/schedule-1/images/0/05/Donut_Icon.png/revision/latest?cb=20250406212203',
  'https://static.wikia.nocookie.net/schedule-1/images/7/72/Viagra_Icon.png/revision/latest?cb=20250406212258',
  'https://static.wikia.nocookie.net/schedule-1/images/d/d5/Mouth_Wash_Icon.png/revision/latest?cb=20250406212333',
  'https://static.wikia.nocookie.net/schedule-1/images/6/62/Flu_Medicine_Icon.png/revision/latest?cb=20250406212355',
  'https://static.wikia.nocookie.net/schedule-1/images/8/87/Gasoline_Icon.png/revision/latest?cb=20250406212411',
  'https://static.wikia.nocookie.net/schedule-1/images/6/6d/Energy_Drink_Icon.png/revision/latest?cb=20250406212432',
  'https://static.wikia.nocookie.net/schedule-1/images/1/17/Motor_Oil_Icon.png/revision/latest?cb=20250406212450',
  'https://static.wikia.nocookie.net/schedule-1/images/3/3f/Mega_Bean_Icon.png/revision/latest?cb=20250406212514',
  'https://static.wikia.nocookie.net/schedule-1/images/8/8b/Chili_Icon.png/revision/latest?cb=20250406212531',
  'https://static.wikia.nocookie.net/schedule-1/images/4/40/Battery_Icon.png/revision/latest?cb=20250406212545',
  'https://static.wikia.nocookie.net/schedule-1/images/c/c0/Iodine_Icon.png/revision/latest?cb=20250406212603',
  'https://static.wikia.nocookie.net/schedule-1/images/d/d8/Addy_Icon.png/revision/latest?cb=20250406212619',
  'https://static.wikia.nocookie.net/schedule-1/images/a/a0/Acid_Icon.png/revision/latest?cb=20250406212714',
  'https://static.wikia.nocookie.net/schedule-1/images/b/b1/Phosphorus_Icon.png/revision/latest?cb=20250406212731',
  'https://static.wikia.nocookie.net/schedule-1/images/b/b8/Cheap_Plastic_Pot_Icon.png/revision/latest?cb=20250406212923',
  'https://static.wikia.nocookie.net/schedule-1/images/b/b7/Moisture_Preserving_Pot_Icon.png/revision/latest?cb=20250406212941',
  'https://static.wikia.nocookie.net/schedule-1/images/f/f2/Suspension_Rack_Icon.png/revision/latest?cb=20250406213038',
  'https://static.wikia.nocookie.net/schedule-1/images/1/1f/Halogen_Light_Icon.png/revision/latest?cb=20250406213101',
  'https://static.wikia.nocookie.net/schedule-1/images/d/da/LED_Light_Icon.png/revision/latest?cb=20250406213118',
  'https://static.wikia.nocookie.net/schedule-1/images/5/58/Full_Spectrum_Light_Icon.png/revision/latest?cb=20250406213157',
  'https://static.wikia.nocookie.net/schedule-1/images/7/7f/Chemistry_Station_Icon.png/revision/latest?cb=20250406213339',
  'https://static.wikia.nocookie.net/schedule-1/images/4/44/Lab_Oven_Icon.png/revision/latest?cb=20250406213358',
  'https://static.wikia.nocookie.net/schedule-1/images/b/bf/Mixing_Station_Mk2_Icon.png/revision/latest?cb=20250406213435',
  'https://static.wikia.nocookie.net/schedule-1/images/f/f3/Air_Pot_Icon.png/revision/latest?cb=20250406213012',
  'https://static.wikia.nocookie.net/schedule-1/images/0/09/Drying_Rack_Icon.png/revision/latest?cb=20250406213458',
  'https://static.wikia.nocookie.net/schedule-1/images/7/76/Brick_Press_Icon.png/revision/latest?cb=20250406213512',
  'https://static.wikia.nocookie.net/schedule-1/images/1/12/Cauldron_Icon.png/revision/latest?cb=20250406213531',
]

// Define the mapping of original filenames to new paths
const fileMapping = {
  // Stations
  'Grow_Tent_Icon.png': '/images/stations/grow_tent.png',
  'Chemistry_Station_Icon.png': '/images/stations/chemistry.png',
  'Mixing_Station_Icon.png': '/images/stations/mixing.png',
  'PackagingStation_Icon.png': '/images/stations/packaging.png',
  'Brick_Press_Icon.png': '/images/stations/brick_press.png',

  // Inputs
  'Cheap_Plastic_Pot_Icon.png': '/images/pots/plastic.png',
  'Moisture_Preserving_Pot_Icon.png': '/images/pots/moisture.png',
  'Air_Pot_Icon.png': '/images/pots/air.png',
  'Soil_Icon.png': '/images/inputs/soil.png',
  'Fertilizer_Icon.png': '/images/inputs/fertilizer.png',
  'PGR_Icon.png': '/images/inputs/pgr.png',
  'SpeedGrow_Icon.png': '/images/inputs/speed_grow.png',
  'Acid_Icon.png': '/images/inputs/acid.png',
  'Phosphorus_Icon.png': '/images/inputs/phosphorus.png',
  'Gasoline_Icon.png': '/images/inputs/gasoline.png',
  'Motor_Oil_Icon.png': '/images/inputs/motor_oil.png',
  'Baggie_Icon.png': '/images/inputs/baggie.png',
  'Jar_Icon.png': '/images/inputs/jar.png',

  // Outputs
  'OGKushSeed_Icon.png': '/images/outputs/og_kush.png',
  'SourDieselSeed_Icon.png': '/images/outputs/sour_diesel.png',
  'GreenCrackSeed_Icon.png': '/images/outputs/green_crack.png',
  'GranddaddyPurpleSeed_Icon.png': '/images/outputs/granddaddy_purple.png',
  'CocaSeed_Icon.png': '/images/outputs/coca.png',
  'LongLifeSoil_Icon.png': '/images/outputs/long_life_soil.png',
  'ExtraLongLifeSoil_Stored_Icon.png': '/images/outputs/extra_long_life_soil.png',
}

// Create necessary directories
const directories = [
  'public/images/stations',
  'public/images/pots',
  'public/images/inputs',
  'public/images/outputs',
]

directories.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
})

function downloadImage(url, targetPath) {
  return new Promise((resolve, reject) => {
    const fullPath = path.join('public', targetPath)
    const file = fs.createWriteStream(fullPath)

    https
      .get(url, (response) => {
        response.pipe(file)

        file.on('finish', () => {
          file.close()
          console.log(`Downloaded: ${targetPath}`)
          resolve()
        })
      })
      .on('error', (err) => {
        fs.unlink(fullPath, () => {})
        console.error(`Error downloading to ${targetPath}:`, err.message)
        reject(err)
      })

    file.on('error', (err) => {
      fs.unlink(fullPath, () => {})
      console.error(`Error writing to ${targetPath}:`, err.message)
      reject(err)
    })
  })
}

async function downloadAllImages() {
  for (const url of imgs) {
    // Extract filename from URL (improved parsing)
    const matches = url.match(/\/([^\/]+)\/revision/)
    if (matches && matches[1]) {
      const originalFilename = matches[1]
      const newPath = fileMapping[originalFilename]

      if (newPath) {
        try {
          await downloadImage(url, newPath)
        } catch (error) {
          console.error(`Failed to download ${newPath}`, error)
        }
      } else {
        console.log(`Skipping ${originalFilename} - no mapping found`)
      }
    } else {
      console.log(`Could not parse filename from URL: ${url}`)
    }
  }
}

// Print mapping information and start download
console.log('Files will be downloaded with the following mapping:')
Object.entries(fileMapping).forEach(([from, to]) => {
  console.log(`${from} -> ${to}`)
})

console.log('\nDo you want to proceed with the download? (y/n)')
process.stdin.once('data', (data) => {
  const answer = data.toString().trim().toLowerCase()
  if (answer === 'y') {
    downloadAllImages()
  } else {
    console.log('Download cancelled')
    process.exit(0)
  }
})
