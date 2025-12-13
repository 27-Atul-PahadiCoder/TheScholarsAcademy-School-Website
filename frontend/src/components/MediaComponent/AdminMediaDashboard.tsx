import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import RenameModal from "./RenameModal";
import ChangePathModal from "./ChangePathModal";
import DeleteModal from "./DeleteModal";
import Modal from "./Modal"; // Import the Modal component
import { renameMedia, changeMediaPath, deleteMedia } from "../../api/media";

interface Media {
  id: number;
  name: string;
  type: string;
  path: string;
  location: string;
  status: "used" | "not used";
}

type NotificationType = "success" | "error";

const AdminMediaDashboard: React.FC = () => {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showRenameModal, setShowRenameModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showChangePathModal, setShowChangePathModal] =
    useState<boolean>(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [location, setLocation] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterLocation, setFilterLocation] = useState<string>("");
  const [visibleMediaCount, setVisibleMediaCount] = useState<number>(20);
  const [notification, setNotification] = useState<{
    message: string;
    type: NotificationType;
  } | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      // This is mock data. In a real application, you would fetch this from your backend.
      const allImages: Media[] = [
        {
          id: 1,
          name: "AnitaKapri.jpg",
          type: "image",
          path: "/images/Faculty-Staff/AnitaKapri.jpg",
          location: "Faculty-Staff",
          status: "used",
        },
        {
          id: 2,
          name: "AnupamaSanyal.jpg",
          type: "image",
          path: "/images/Faculty-Staff/AnupamaSanyal.jpg",
          location: "Faculty-Staff",
          status: "used",
        },
        {
          id: 3,
          name: "BeenaPatni.jpg",
          type: "image",
          path: "/images/Faculty-Staff/BeenaPatni.jpg",
          location: "Faculty-Staff",
          status: "used",
        },
        {
          id: 4,
          name: "DeepaJukariya.jpg",
          type: "image",
          path: "/images/Faculty-Staff/DeepaJukariya.jpg",
          location: "Faculty-Staff",
          status: "used",
        },
        {
          id: 5,
          name: "enjoying.jpg",
          type: "image",
          path: "/images/Faculty-Staff/enjoying.jpg",
          location: "Faculty-Staff",
          status: "used",
        },
        {
          id: 6,
          name: "FounderImage.jpg",
          type: "image",
          path: "/images/Faculty-Staff/FounderImage.jpg",
          location: "Faculty-Staff",
          status: "used",
        },
        {
          id: 7,
          name: "kamlaPant.jpg",
          type: "image",
          path: "/images/Faculty-Staff/kamlaPant.jpg",
          location: "Faculty-Staff",
          status: "used",
        },
        {
          id: 8,
          name: "logo-150x150.png",
          type: "image",
          path: "/images/Faculty-Staff/logo-150x150.png",
          location: "Faculty-Staff",
          status: "used",
        },
        {
          id: 9,
          name: "logo-circle.svg",
          type: "image",
          path: "/images/Faculty-Staff/logo-circle.svg",
          location: "Faculty-Staff",
          status: "not used",
        },
        {
          id: 10,
          name: "logo.png",
          type: "image",
          path: "/images/Faculty-Staff/logo.png",
          location: "Faculty-Staff",
          status: "used",
        },
        {
          id: 11,
          name: "pexels-photo-872955-qdawmgbb24l6wdvk53jcflsth25gu0xtbrs6m27ya4.jpg",
          type: "image",
          path: "/images/Faculty-Staff/pexels-photo-872955-qdawmgbb24l6wdvk53jcflsth25gu0xtbrs6m27ya4.jpg",
          location: "Faculty-Staff",
          status: "used",
        },
        {
          id: 12,
          name: "PremaPunera.jpg",
          type: "image",
          path: "/images/Faculty-Staff/PremaPunera.jpg",
          location: "Faculty-Staff",
          status: "used",
        },
        {
          id: 13,
          name: "ScaledFounderImage.jpg",
          type: "image",
          path: "/images/Faculty-Staff/ScaledFounderImage.jpg",
          location: "Faculty-Staff",
          status: "used",
        },
        {
          id: 14,
          name: "schoolCommunity.jpg",
          type: "image",
          path: "/images/Faculty-Staff/schoolCommunity.jpg",
          location: "Faculty-Staff",
          status: "used",
        },
        {
          id: 15,
          name: "smilePhoto.png",
          type: "image",
          path: "/images/Faculty-Staff/smilePhoto.png",
          location: "Faculty-Staff",
          status: "used",
        },
        {
          id: 16,
          name: "Music_Dance01.jpg",
          type: "image",
          path: "/images/music-Dance/Music_Dance01.jpg",
          location: "music-Dance",
          status: "not used",
        },
        {
          id: 17,
          name: "Music_Dance02.jpg",
          type: "image",
          path: "/images/music-Dance/Music_Dance02.jpg",
          location: "music-Dance",
          status: "not used",
        },
        {
          id: 18,
          name: "Music_Dance03.jpg",
          type: "image",
          path: "/images/music-Dance/Music_Dance03.jpg",
          location: "music-Dance",
          status: "not used",
        },
        {
          id: 19,
          name: "Music_Dance04.jpg",
          type: "image",
          path: "/images/music-Dance/Music_Dance04.jpg",
          location: "music-Dance",
          status: "not used",
        },
        {
          id: 20,
          name: "Music_Dance05.jpg",
          type: "image",
          path: "/images/music-Dance/Music_Dance05.jpg",
          location: "music-Dance",
          status: "not used",
        },
        {
          id: 21,
          name: "Music_Dance06.jpg",
          type: "image",
          path: "/images/music-Dance/Music_Dance06.jpg",
          location: "music-Dance",
          status: "not used",
        },
        {
          id: 22,
          name: "Music_Dance07.jpg",
          type: "image",
          path: "/images/music-Dance/Music_Dance07.jpg",
          location: "music-Dance",
          status: "not used",
        },
        {
          id: 23,
          name: "Music_Dance08.jpg",
          type: "image",
          path: "/images/music-Dance/Music_Dance08.jpg",
          location: "music-Dance",
          status: "not used",
        },
        {
          id: 24,
          name: "IMG_20230811_1241322-300x225.jpg",
          type: "image",
          path: "/images/PhotoMomemts/IMG_20230811_1241322-300x225.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 25,
          name: "IMG_20230811_1241322-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/IMG_20230811_1241322-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 26,
          name: "logo-150x150.png",
          type: "image",
          path: "/images/PhotoMomemts/logo-150x150.png",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 27,
          name: "NP1040355-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/NP1040355-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 28,
          name: "NP1040355-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/NP1040355-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 29,
          name: "P1000104-2048x1152.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1000104-2048x1152.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 30,
          name: "P1000681-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1000681-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 31,
          name: "P1000681-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1000681-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 32,
          name: "P1000687-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1000687-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 33,
          name: "P1000687-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1000687-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 34,
          name: "P1000694-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1000694-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 35,
          name: "P1000694-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1000694-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 36,
          name: "P1000709-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1000709-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 37,
          name: "P1000741-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1000741-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 38,
          name: "P1000741-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1000741-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 39,
          name: "P1000759-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1000759-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 40,
          name: "P1000759-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1000759-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 41,
          name: "P1000829-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1000829-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 42,
          name: "P1000829-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1000829-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 43,
          name: "P1000846-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1000846-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 44,
          name: "P1010026-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1010026-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 45,
          name: "P1010026-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1010026-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 46,
          name: "P1010053-1-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1010053-1-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 47,
          name: "P1010053-1-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1010053-1-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 48,
          name: "P1010094-1536x864.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1010094-1536x864.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 49,
          name: "P1010094-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1010094-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 50,
          name: "P1020032-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1020032-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 51,
          name: "P1020032-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1020032-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 52,
          name: "P1020055-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1020055-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 53,
          name: "P1020055-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1020055-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 54,
          name: "P1040016-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1040016-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 55,
          name: "P1040016-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1040016-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 56,
          name: "P1040192-300x169.png",
          type: "image",
          path: "/images/PhotoMomemts/P1040192-300x169.png",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 57,
          name: "P1040192.png",
          type: "image",
          path: "/images/PhotoMomemts/P1040192.png",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 58,
          name: "P1040609-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1040609-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 59,
          name: "P1040609-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1040609-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 60,
          name: "P1040843-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1040843-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 61,
          name: "P1050103-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050103-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 62,
          name: "P1050103-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050103-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 63,
          name: "P1050154-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050154-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 64,
          name: "P1050154-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050154-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 65,
          name: "P1050159-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050159-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 66,
          name: "P1050159-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050159-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 67,
          name: "P1050324-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050324-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 68,
          name: "P1050324-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050324-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 69,
          name: "P1050330-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050330-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 70,
          name: "P1050330-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050330-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 71,
          name: "P1050333-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050333-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 72,
          name: "P1050333-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050333-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 73,
          name: "P1050345-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050345-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 74,
          name: "P1050345-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050345-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 75,
          name: "P1050376-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050376-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 76,
          name: "P1050376-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050376-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 77,
          name: "P1050377-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050377-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 78,
          name: "P1050377-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050377-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 79,
          name: "P1050381-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050381-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 80,
          name: "P1050381-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050381-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 81,
          name: "P1050384-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050384-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 82,
          name: "P1050384-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050384-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 83,
          name: "P1050392-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050392-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 84,
          name: "P1050392-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050392-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 85,
          name: "P1050426-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050426-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 86,
          name: "P1050426-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050426-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 87,
          name: "P1050460-scaled-qjoqykboawjbqcvj181kinqxr7xstpfx4dn9adlruo.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050460-scaled-qjoqykboawjbqcvj181kinqxr7xstpfx4dn9adlruo.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 88,
          name: "P1050476-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050476-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 89,
          name: "P1050476-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050476-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 90,
          name: "P1050772-1-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050772-1-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 91,
          name: "P1050772-1-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050772-1-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 92,
          name: "P1050793-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050793-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 93,
          name: "P1050793-scaled-qjoqu8agselq7366ccli0r4f59avby8h6xcnmg14jk.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050793-scaled-qjoqu8agselq7366ccli0r4f59avby8h6xcnmg14jk.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 94,
          name: "P1050793-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1050793-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 95,
          name: "P1060071-1-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1060071-1-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 96,
          name: "P1060071-1-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1060071-1-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 97,
          name: "P1060195-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1060195-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 98,
          name: "P1060195-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1060195-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 99,
          name: "P1060237-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1060237-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 100,
          name: "P1060290-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1060290-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 101,
          name: "P1060301-1-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1060301-1-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 102,
          name: "P1070629-scaled-qjqf9atrf45ianvz6w6pnzgul3c0j2knxzxswj706c.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1070629-scaled-qjqf9atrf45ianvz6w6pnzgul3c0j2knxzxswj706c.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 103,
          name: "P1070633-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1070633-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 104,
          name: "P1070892-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1070892-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 105,
          name: "P1070892-scaled.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1070892-scaled.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 106,
          name: "P1090511-300x169.jpg",
          type: "image",
          path: "/images/PhotoMomemts/P1090511-300x169.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 107,
          name: "SchoolF.jpg",
          type: "image",
          path: "/images/PhotoMomemts/SchoolF.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 108,
          name: "SchoolFour.jpg",
          type: "image",
          path: "/images/PhotoMomemts/SchoolFour.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 109,
          name: "schoolOne.jpg",
          type: "image",
          path: "/images/PhotoMomemts/schoolOne.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
        {
          id: 110,
          name: "schoolTwo.jpg",
          type: "image",
          path: "/images/PhotoMomemts/schoolTwo.jpg",
          location: "PhotoMomemts",
          status: "used",
        },
      ];
      setMedia(allImages);
      setLoading(false);
    };
    fetchMedia();
  }, []);

  const showNotification = (message: string, type: NotificationType) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleRenameClick = (item: Media) => {
    setSelectedMedia(item);
    setShowRenameModal(true);
  };

  const handleChangePathClick = (item: Media) => {
    setSelectedMedia(item);
    setShowChangePathModal(true);
  };

  const handleDeleteClick = (item: Media) => {
    setSelectedMedia(item);
    setShowDeleteModal(true);
  };

  const handleRename = async (newName: string) => {
    if (selectedMedia) {
      const result = await renameMedia(selectedMedia.path, newName);
      if (result.success) {
        const updatedMedia = media.map((item) =>
          item.id === selectedMedia.id
            ? {
                ...item,
                name: newName,
                path:
                  item.path.substring(0, item.path.lastIndexOf("/") + 1) +
                  newName,
              }
            : item
        );
        setMedia(updatedMedia);
        showNotification(result.message, "success");
      } else {
        showNotification(result.message, "error");
      }
    }
    setShowRenameModal(false);
  };

  const handleChangePath = async (newPath: string) => {
    if (selectedMedia) {
      const result = await changeMediaPath(selectedMedia.path, newPath);
      if (result.success) {
        const updatedMedia = media.map((item) =>
          item.id === selectedMedia.id ? { ...item, path: newPath } : item
        );
        setMedia(updatedMedia);
        showNotification(result.message, "success");
      } else {
        showNotification(result.message, "error");
      }
    }
    setShowChangePathModal(false);
  };

  const handleDelete = async () => {
    if (selectedMedia) {
      const result = await deleteMedia(selectedMedia.path);
      if (result.success) {
        const updatedMedia = media.filter(
          (item) => item.id !== selectedMedia.id
        );
        setMedia(updatedMedia);
        showNotification(result.message, "success");
      } else {
        showNotification(result.message, "error");
      }
    }
    setShowDeleteModal(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleUpload = () => {
    // Mock upload logic
    if (file && location) {
      console.log(`Uploading ${file.name} to ${location}`);
      setShowAddModal(false);
      setFile(null);
      setLocation("");
    }
  };

  const filteredMedia = media
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.path.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((item) =>
      filterLocation ? item.location === filterLocation : true
    );

  const locations = [...new Set(media.map((item) => item.location))];

  const handleShowMore = () => {
    setVisibleMediaCount((prevCount) => prevCount + 20);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {notification && (
        <div
          className={`fixed top-4 left-1/2 -translate-x-1/2 p-4 mb-4 text-white rounded shadow-lg z-50 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Media Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add Media
        </button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name or path"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          className="border p-2"
        />
        <select
          value={filterLocation}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setFilterLocation(e.target.value)
          }
          className="border p-2"
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Thumbnail</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Path</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedia.slice(0, visibleMediaCount).map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b">
                  {item.type === "image" ? (
                    <img
                      src={item.path}
                      alt={item.name}
                      className="w-20 h-20 object-cover"
                    />
                  ) : (
                    <video src={item.path} className="w-20 h-20 object-cover" />
                  )}
                </td>
                <td className="py-2 px-4 border-b">{item.name}</td>
                <td className="py-2 px-4 border-b">{item.path}</td>
                <td className="py-2 px-4 border-b">{item.location}</td>
                <td className="py-2 px-4 border-b">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === "used"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <div
                    onClick={() => handleRenameClick(item)}
                    className="bg-blue-600 text-gray-900 hover:bg-blue-400 hover:text-white px-3 py-1 rounded-md mr-3 transition-colors cursor-pointer"
                  >
                    Rename
                  </div>
                  <div
                    onClick={() => handleChangePathClick(item)}
                    className="bg-yellow-600 text-gray-900 hover:bg-yellow-400 hover:text-white px-3 py-1 rounded-md mr-3 transition-colors cursor-pointer"
                  >
                    Change Path
                  </div>
                  <div
                    onClick={() => handleDeleteClick(item)}
                    className="bg-red-600 text-gray-900 hover:bg-red-400 hover:text-white px-3 py-1 rounded-md transition-colors cursor-pointer"
                  >
                    Delete
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {visibleMediaCount < filteredMedia.length && (
        <div className="mt-4 text-center ">
          <button
            onClick={handleShowMore}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-black font-semibold px-8 py-4 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-400 hover:to-indigo-500 transition-all duration-500 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500"
          >
            Show More
          </button>
        </div>
      )}

      {/* Add Media Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Media</h2>
          <button onClick={() => setShowAddModal(false)}>
            <Plus size={24} className="transform rotate-45" />
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          <input type="file" onChange={handleFileChange} />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={handleLocationChange}
            className="border p-2"
          />
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Upload
          </button>
        </div>
      </Modal>

      <RenameModal
        isOpen={showRenameModal}
        onClose={() => setShowRenameModal(false)}
        onRename={handleRename}
        oldPath={selectedMedia?.name || ""}
      />

      <ChangePathModal
        isOpen={showChangePathModal}
        onClose={() => setShowChangePathModal(false)}
        onChangePath={handleChangePath}
        oldPath={selectedMedia?.path || ""}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
        path={selectedMedia?.path || ""}
      />
    </div>
  );
};

export default AdminMediaDashboard;
