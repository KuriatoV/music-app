import GradientLayout from '../components/GradientLayout';

const Home = () => {
    return (
        <GradientLayout
            roundImage
            color="purple"
            subtitle="profile"
            title="Kuriato Valentyn"
            description="15 public playlists"
            image="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
        >
            <div>home</div>
        </GradientLayout>
    );
};

export default Home;
